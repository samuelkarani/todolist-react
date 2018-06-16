import React from "react";
import PropTypes from "prop-types";

const TodoItem = ({
  id,
  completed,
  title,
  status,
  handleToggleComplete,
  handleChangeTitle,
  handleRemove,
  handleDuplicate
}) => (
  <li data-status={status}>
    <div className="uk-flex uk-flex-middle uk-grid">
      <div>
        <span
          className="uk-sortable-handle uk-margin-small-right"
          uk-icon="icon: table"
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

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  handleToggleComplete: PropTypes.func.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleDuplicate: PropTypes.func.isRequired
};

export default TodoItem;
