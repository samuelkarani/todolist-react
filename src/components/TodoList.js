import React, { PureComponent } from "react";
import ReactList from "react-list";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import TodoClass from "../classes/todo";

const TodoList = class extends PureComponent {
  renderItem = (index, key) => {
    const todo = this.props.todoList[index];
    return (
      <TodoItem
        key={todo.id}
        isNew={this.props.newId === todo.id}
        id={todo.id}
        title={todo.title}
        completed={todo.completed}
        handleEditTodo={this.props.handleEditTodo}
        handleRemoveTodo={this.props.handleRemoveTodo}
        handleDuplicateTodo={this.props.handleDuplicateTodo}
      />
    );
  };

  render() {
    return (
      <div>
        <ul
          className="uk-list uk-list-divider js-filter uk-overflow-auto"
          uk-sortable="handle: .uk-sortable-handle"
          uk-height-viewport=""
        >
          <ReactList
            itemRenderer={this.renderItem}
            length={this.props.todoList.length}
            type="uniform"
          />
        </ul>
      </div>
    );
  }
};

TodoList.propTypes = {
  newId: PropTypes.string,
  todoList: PropTypes.arrayOf(PropTypes.instanceOf(TodoClass)).isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  handleDuplicateTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired
};

export default TodoList;
