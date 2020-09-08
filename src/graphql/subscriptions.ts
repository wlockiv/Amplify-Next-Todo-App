// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      createdAt
      completed
      todoList {
        id
        createdAt
        todos {
          nextToken
        }
      }
      userid
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      createdAt
      completed
      todoList {
        id
        createdAt
        todos {
          nextToken
        }
      }
      userid
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      createdAt
      completed
      todoList {
        id
        createdAt
        todos {
          nextToken
        }
      }
      userid
    }
  }
`;
export const onCreateTodoList = /* GraphQL */ `
  subscription OnCreateTodoList {
    onCreateTodoList {
      id
      createdAt
      todos {
        items {
          id
          name
          createdAt
          completed
          userid
        }
        nextToken
      }
    }
  }
`;
export const onUpdateTodoList = /* GraphQL */ `
  subscription OnUpdateTodoList {
    onUpdateTodoList {
      id
      createdAt
      todos {
        items {
          id
          name
          createdAt
          completed
          userid
        }
        nextToken
      }
    }
  }
`;
export const onDeleteTodoList = /* GraphQL */ `
  subscription OnDeleteTodoList {
    onDeleteTodoList {
      id
      createdAt
      todos {
        items {
          id
          name
          createdAt
          completed
          userid
        }
        nextToken
      }
    }
  }
`;
