import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Search from "./Search";

export default class AppBar extends PureComponent {
  render() {
    const {
      allCompleted,
      handleToggleCompleteAll,
      handleClearCompleted,
      handleAdd,
      handleSearch,
      showSearch,
      filter
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
              filter={filter}
            />
          </div>

          {/* <div>
            <button href="" uk-marker="" onClick={handleAdd} />
          </div> */}
        </div>

        {showSearch && (
          <div>
            <Search handleSearch={handleSearch} filter={filter} />
          </div>
        )}

        {/* TODO */}
        {/* <div>
          <button className="uk-button uk-button-default uk-form-small">
            Organize
          </button>
        </div> */}

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
  handleAdd: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired
};
