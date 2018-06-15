import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class AppBar extends PureComponent {
  render() {
    const {
      allCompleted,
      handleToggleCompleteAll,
      handleClearCompleted,
      handleAdd
    } = this.props;
    return (
      <div className="uk-flex uk-flex-middle uk-flex-between">
        <div className="uk-flex uk-flex-middle uk-grid">
          <div>
            <input
              className="uk-checkbox"
              type="checkbox"
              checked={allCompleted}
              onChange={handleToggleCompleteAll}
            />
          </div>

          <div>
            <button href="" uk-marker="" onClick={handleAdd} />
          </div>
        </div>

        <div>
          <button
            className="uk-button uk-button-small uk-button-default"
            onClick={handleClearCompleted}
          >
            clear completed
          </button>
        </div>
      </div>
    );
  }
}

AppBar.propTypes = {
  allCompleted: PropTypes.bool.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  handleToggleCompleteAll: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired
};
