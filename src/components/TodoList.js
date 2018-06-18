import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import TodoClass from "../classes/todo";

const TodoList = ({
  todoList,
  handleEditTodo,
  handleDuplicateTodo,
  handleRemoveTodo,
  focusFirstTodo
}) => (
  <div>
    <ul
      className="uk-list uk-list-divider js-filter"
      uk-sortable="handle: .uk-sortable-handle"
    >
      {todoList.map((todo, idx) => (
        <TodoItem
          status={todo.completed ? "completed" : "active"}
          key={todo.id}
          id={todo.id.toString()}
          title={todo.title}
          completed={todo.completed}
          handleEditTodo={handleEditTodo}
          handleRemoveTodo={handleRemoveTodo}
          handleDuplicateTodo={handleDuplicateTodo}
          focusFirstTodo={focusFirstTodo && idx === 0 ? true : false}
        />
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.instanceOf(TodoClass)).isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  handleDuplicateTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  focusFirstTodo: PropTypes.bool.isRequired
};

export default TodoList;
