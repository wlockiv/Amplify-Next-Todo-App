import { API, graphqlOperation } from "aws-amplify";
import { createTodo, createTodoList } from "../src/graphql/mutations";

import { GetTodoListQuery } from "../src/API";
import React from "react";
import config from "../src/aws-exports";
import { getTodoList } from "../src/graphql/queries";
import { nanoid } from "nanoid";
import produce from "immer";

API.configure(config);

const MY_ID = nanoid();

type Todo = {
  id: string;
  name: string;
  createdAt: string;
  completed: boolean;
};

type State = { todos: Todo[]; currentTodo: string };
type Action =
  | { type: "add" | "update" | "delete"; payload: Todo }
  | { type: "set-current"; payload: string };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "set-current": {
      return produce(state, (draft) => {
        draft.currentTodo = action.payload;
      });
    }
    case "add": {
      return produce(state, (draft) => {
        draft.todos.push(action.payload);
      });
    }
    case "update": {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (todoIndex === -1) return state;
      return produce(state, (draft) => {
        draft.todos[todoIndex] = { ...action.payload };
      });
    }
    case "delete": {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (todoIndex === -1) return state;
      return produce(state, (draft) => {
        draft.todos.splice(todoIndex, 1);
      });
    }
    default: {
      throw new Error(`Unsupported action ${JSON.stringify(action)}`);
    }
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    currentTodo: "",
    todos: [],
  });

  const add = async () => {
    const todo = {
      id: nanoid(),
      name: state.currentTodo,
      completed: false,
      createdAt: `${Date.now}`,
    };

    dispatch({
      type: "add",
      payload: todo,
    });

    // Optimistic update
    dispatch({ type: "set-current", payload: "" });

    try {
      await API.graphql(
        graphqlOperation(createTodo, {
          input: { ...todo, todoTodoListId: "global", userId: MY_ID },
        })
      );
    } catch (err) {
      // With revert on error
      dispatch({ type: "set-current", payload: todo.name });
    }
  };

  const edit = (todo: Todo) => {
    dispatch({ type: "update", payload: todo });
  };

  const del = (todo: Todo) => {
    dispatch({ type: "delete", payload: todo });
  };

  return (
    <>
      <header>
        <h2>Todo List</h2>
      </header>
      <main>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // Erroneous in example code
            add();
          }}
        >
          <input
            type="text"
            value={state.currentTodo}
            onChange={(event) =>
              dispatch({ type: "set-current", payload: event.target.value })
            }
          />
          <button type="submit">Add</button>
          <ul>
            {state.todos.map((todo) => {
              return (
                <li key={todo.id}>
                  <input
                    type="text"
                    value={todo.name}
                    onChange={(event) => {
                      edit({ ...todo, name: event.target.value });
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      del(todo);
                    }}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </form>
      </main>
    </>
  );
};

App.getInitialProps = async () => {
  let result;

  try {
    result = await API.graphql(graphqlOperation(getTodoList, { id: "global" }));
  } catch (err) {
    console.warn(err);
    return { todos: [] };
  }

  if (result.errors) {
    console.warn("Failed to fetch todolist. ", result.errors);
  }

  if (result.data.getTodoList !== null) {
    return { todos: result.data.getTodoList.todos.items };
  }

  try {
    await API.graphql(
      graphqlOperation(createTodoList, {
        input: { id: "global", createdAt: `${Date.now()}` },
      })
    );
  } catch (err) {
    console.warn(err);
  }

  return { todos: [] };
};

export default App;
