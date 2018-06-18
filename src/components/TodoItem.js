import React from "react";
import PropTypes from "prop-types";

const TodoItem = ({
  id,
  completed,
  title,
  status,
  handleEditTodo,
  handleRemoveTodo,
  handleDuplicateTodo,
  focusFirstTodo
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
          onChange={e => handleEditTodo({ completed: e.target.checked, id })}
        />
      </div>
      <div className="uk-width-expand">
        <input
          className="uk-input uk-form-blank"
          type="text"
          name="title"
          value={title}
          autoFocus={focusFirstTodo}
          onChange={e => handleEditTodo({ title: e.target.value, id })}
        />
      </div>

      <div>
        <button
          className="uk-icon-link"
          uk-icon="copy"
          onClick={() => handleDuplicateTodo(id)}
        />
      </div>
      <div>
        <button
          className="uk-icon-link"
          uk-icon="close"
          onClick={() => handleRemoveTodo(id)}
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
  handleEditTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleDuplicateTodo: PropTypes.func.isRequired,
  focusFirstTodo: PropTypes.bool.isRequired
};

export default TodoItem;
