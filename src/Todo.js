import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Todo extends Component {
  render() {
    const { id, completed, description, toggleComplete } = this.props;
    return (
      <li>
        <input
          className="uk-checkbox"
          type="checkbox"
          checked={completed}
          onChange={e => toggleComplete(e.target.completed, id)}
        />
        {description}
      </li>
    );
  }
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  toggleComplete: PropTypes.func.isRequired
};
