import React, { Component } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Todo extends Component {
  render() {
    const {
      id,
      completed,
      title,
      date,
      isStarred,
      handleToggleComplete,
      handleChangeTitle,
      handleChangeDate,
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
            {/* <a uk-icon="clock" onClick={() => handleChangeDate(id)} /> */}
            <DatePicker
              selected={date}
              onChange={date => handleChangeDate(date, id)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="LLL"
              timeCaption="time"
              isClearable={false}
              popperPlacement="left-start"
              className="uk-input"
            />
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
  date: PropTypes.object.isRequired,
  isStarred: PropTypes.bool.isRequired,
  handleToggleComplete: PropTypes.func.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleToggleStar: PropTypes.func.isRequired,
  handleChangeDate: PropTypes.func.isRequired
};
