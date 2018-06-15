import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AppBar extends Component {
  render() {
    const {
      allCompleted,
      handleToggleCompleteAll,
      handleClearCompleted
    } = this.props;
    return (
      <div className="uk-flex uk-flex-middle uk-flex-between">
        <div>
          <input
            className="uk-checkbox"
            type="checkbox"
            checked={allCompleted}
            onChange={handleToggleCompleteAll}
          />
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
  handleToggleCompleteAll: PropTypes.func.isRequired
};
