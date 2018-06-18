import React, { PureComponent, createRef } from "react";
import PropTypes from "prop-types";

const TodoItem = class extends PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }

  state = {
    title: this.props.title
  };

  focusInput() {
    this.inputRef.current.focus();
  }

  blurInput() {
    this.inputRef.current.blur();
  }

  handleChange = (e, id) => {
    const title = this.inputRef.current.value.toLowerCase();
    this.setState({
      title
    });
    if (!title) {
      this.focusInput();
    }
  };

  handleBlur = (e, id) => {
    const { title } = this.state;
    if (title) {
      this.props.handleEditTodo({ title, id });
    } else {
      this.setState({
        title: this.props.title
      });
      this.focusInput();
    }
  };

  handleKeyDown = (e, id) => {
    const { title } = this.state;
    if (e.which === 13) {
      if (title) {
        this.blurInput();
        this.props.handleEditTodo({ title, id });
      } else {
        this.setState({
          title: this.props.title
        });
      }
    }
  };

  render() {
    const {
      id,
      completed,
      handleEditTodo,
      handleRemoveTodo,
      handleDuplicateTodo
    } = this.props;

    const { title } = this.state;

    return (
      <li>
        <div className="uk-flex uk-flex-middle uk-grid">
          <div>
            <input
              className="uk-checkbox"
              type="checkbox"
              checked={completed}
              onChange={e =>
                handleEditTodo({ completed: e.target.checked, id })
              }
            />
          </div>
          <div>
            <span
              className="uk-sortable-handle uk-margin-small-right"
              uk-icon="icon: table"
            />
          </div>
          <div className="uk-width-expand">
            <input
              className="uk-input uk-form-blank"
              type="text"
              name="title"
              value={title}
              onChange={e => this.handleChange(e, id)}
              onKeyDown={e => this.handleKeyDown(e, id)}
              onBlur={e => this.handleBlur(e, id)}
              ref={this.inputRef}
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
  }
};

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleDuplicateTodo: PropTypes.func.isRequired
};

export default TodoItem;
