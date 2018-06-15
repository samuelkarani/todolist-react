import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class TodoItem extends PureComponent {
  render() {
    const {
      id,
      completed,
      title,
      handleToggleComplete,
      handleChangeTitle,
      handleRemove,
      handleDuplicate
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
              className="uk-input uk-form-blank"
              type="text"
              name="title"
              value={title}
              onChange={e => handleChangeTitle(e.target.value, id)}
            />
          </div>

          <div>
            <button
              className="uk-icon-link"
              uk-icon="copy"
              onClick={() => handleDuplicate(id)}
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

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleToggleComplete: PropTypes.func.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleDuplicate: PropTypes.func.isRequired
};
