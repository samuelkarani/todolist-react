import React from "react";
import PropTypes from "prop-types";
import Search from "./Search";

const AppBar = ({
  allCompleted,
  handleToggleCompleteAll,
  handleClearCompleted,
  handleAdd,
  handleSearch,
  handleClearSearch,
  filter
}) => (
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

      <div>
        <button uk-marker="" onClick={handleAdd} />
      </div>
    </div>

    <div>
      <Search
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
        filter={filter}
      />
    </div>

    <div>
      <button className="uk-button uk-button-default uk-form-small">
        Organize
      </button>
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

AppBar.propTypes = {
  allCompleted: PropTypes.bool.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  handleToggleCompleteAll: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClearSearch: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
};

export default AppBar;
