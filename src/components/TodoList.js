import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import TodoClass from "../classes/todo";

const TodoList = ({
  todoList,
  handleToggleComplete,
  handleChangeTitle,
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
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
          handleToggleComplete={handleToggleComplete}
          handleChangeTitle={handleChangeTitle}
          handleRemove={handleRemove}
          handleDuplicate={handleDuplicate}
        />
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.instanceOf(TodoClass))
};

export default TodoList;
