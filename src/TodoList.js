import React, { PureComponent } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import Todo from "./classes/todo";

export default class TodoList extends PureComponent {
  render() {
    const { todoList } = this.props;
    return (
      <div>
        <ul
          className="uk-list uk-list-divider"
          uk-sortable="handle: .uk-sortable-handle"
        >
          {todoList.map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              handleToggleComplete={this.props.handleToggleComplete}
              handleChangeTitle={this.props.handleChangeTitle}
              handleRemove={this.props.handleRemove}
              handleDuplicate={this.props.handleDuplicate}
            />
          ))}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.instanceOf(Todo))
};
