import React, { PureComponent } from "react";
import ReactList from "react-list";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import TodoClass from "../classes/todo";

const TodoList = class extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderItem = (index, key) => {
    const todo = this.props.todoList[index];
    return (
      <TodoItem
        key={todo.id}
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
    const {
      todoList,
      handleEditTodo,
      handleDuplicateTodo,
      handleRemoveTodo
    } = this.props;

    return (
      <div>
        <ul
          className="uk-list uk-list-divider js-filter uk-height-max-large uk-overflow-auto"
          uk-sortable="handle: .uk-sortable-handle"
        >
          <ReactList
            itemRenderer={this.renderItem}
            length={this.props.todoList.length}
            type="simple"
          />
        </ul>
      </div>
    );
  }
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.instanceOf(TodoClass)).isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  handleDuplicateTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired
};

export default TodoList;
