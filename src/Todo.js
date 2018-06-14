import React, { Component } from "react";
import PropTypes from "prop-types";

import DatePicker from "react-datepicker";

export default class Todo extends Component {
  render() {
    const {
      id,
      completed,
      title,
      reminderDateTime,
      isStarred,
      handleToggleComplete,
      handleChangeTitle,
      handleChangeReminder,
      handleRemove,
      handleToggleStar
    } = this.props;
    return (
      <li>
        <div className="uk-flex uk-flex-middle uk-grid">
          <div>
            <a
              href=""
              uk-icon="icon: star"
              onClick={() => handleToggleStar(!isStarred, id)}
            />
          </div>
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
            <a uk-icon="clock" onClick={() => handleChangeReminder(id)} />

            <span>{reminderDateTime}</span>
          </div>
          <div>
            <button
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
  reminderDateTime: PropTypes.bool.isRequired,
  isStarred: PropTypes.bool.isRequired,
  handleToggleComplete: PropTypes.func.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  handleChangeReminder: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleToggleStar: PropTypes.func.isRequired
};
