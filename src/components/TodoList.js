import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import TodoClass from "../classes/todo";

const TodoList = ({
  todoList,
  handleEditTodo,
  handleDuplicate,
  handleRemove
}) => (
  <div>
    <ul
      className="uk-list uk-list-divider js-filter"
      uk-sortable="handle: .uk-sortable-handle"
    >
      {todoList.map(todo => (
        <TodoItem
          status={todo.completed ? "completed" : "active"}
          key={todo.id}
          id={todo.id.toString()}
          title={todo.title}
          completed={todo.completed}
          handleEditTodo={handleEditTodo}
          handleRemove={handleRemove}
          handleDuplicate={handleDuplicate}
        />
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.instanceOf(TodoClass)).isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  handleDuplicate: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default TodoList;
