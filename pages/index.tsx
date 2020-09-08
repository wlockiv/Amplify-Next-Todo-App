import React, { useReducer } from "react";

import { nanoid } from "nanoid";
import produce from "immer";

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

  const add = () => {
    dispatch({
      type: "add",
      payload: {
        id: nanoid(),
        name: state.currentTodo,
        completed: false,
        createdAt: `${Date.now}`,
      },
    });
    dispatch({ type: "set-current", payload: "" });
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

export default App;