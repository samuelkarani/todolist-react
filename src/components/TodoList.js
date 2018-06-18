import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import TodoClass from "../classes/todo";

const TodoList = ({
  todoList,
  handleEditTodo,
  handleDuplicateTodo,
  handleRemoveTodo
}) => (
  <div>
    <ul
      className="uk-list uk-list-divider js-filter"
      uk-sortable="handle: .uk-sortable-handle"
    >
      {todoList.map((todo, idx) => (
        <TodoItem
          key={todo.id}
          id={todo.id.toString()}
          title={todo.title}
          completed={todo.completed}
          handleEditTodo={handleEditTodo}
          handleRemoveTodo={handleRemoveTodo}
          handleDuplicateTodo={handleDuplicateTodo}
        />
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.instanceOf(TodoClass)).isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  handleDuplicateTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired
};

export default TodoList;
