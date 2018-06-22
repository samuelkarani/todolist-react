export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DUPLICATE_TODO = "DUPLICATE_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const FILTER_TODOS = "FILTER_TODOS";
export const CLEAR_FILTER_TODOS = "CLEAR_FILTER_TODOS";
export const CLEAR_COMPLETED_TODOS = "CLEAR_COMPLETED_TODOS";
export const TOGGLE_COMPLETE_TODOS = "TOGGLE_COMPLETE_TODOS";
export const CHANGE_STATUS_TODOS = "CHANGE_STATUS_TODOS";
export const SELECT_TODOS = "SELECT_TODOS";

export const addTodo = () => ({
  type: ADD_TODO
});

export const updateTodo = ({ completed, title, id }) => ({
  type: UPDATE_TODO,
  updates: { completed, title, id }
});

export const duplicateTodo = (id) => ({ type: UPDATE_TODO, id });

export const removeTodo = (id ) => ({ type: REMOVE_TODO, id });

export const filterTodos = (filter) => ({
    type: FILTER_TODOS,
    filter
})

export const clearFilterTodos = () => ({
  type:CLEAR_FILTER_TODOS
});


export const clearCompletedTodos = () => ({
    type: CLEAR_COMPLETED_TODOS
})

export const filterTodos = (filter, status) => ({
  type: SELECT_TODOS,
  filter,
  status
});
