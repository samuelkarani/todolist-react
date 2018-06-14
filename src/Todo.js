import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Todo extends Component {
  render() {
    const {
      id,
      completed,
      title,
      handleToggleComplete,
      handleChangeTitle,
      handleStar,
      handleRemove,
      isStarred
    } = this.props;
    return (
      <li>
        <div className="uk-flex uk-flex-middle uk-grid">
          <div>
            <input
              className="uk-checkbox"
              type="checkbox"
              checked={completed}
              onChange={e => handleToggleComplete(e.target.checked, id)}
            />
          </div>
          <div className="uk-width-expand">
            <input
              className="uk-input uk-flex"
              type="text"
              name="title"
              value={title}
              onChange={e => handleChangeTitle(e.target.value, id)}
            />
          </div>
          <div>
            <a
              href=""
              uk-icon="star"
              onClick={e => handleStar(!isStarred, id)}
            />
          </div>
          <div>
            <a
              href=""
              className="uk-icon-link"
              uk-icon="close"
              onClick={() => handleRemove(id)}
            />
          </div>
        </div>
      </li>
    );
  }
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  isStarred: PropTypes.bool.isRequired,
  handleToggleComplete: PropTypes.func.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  handleStar: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};
