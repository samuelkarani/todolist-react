import React from "react";
import PropTypes from "prop-types";
import Search from "./Search";

const AppBar = ({
  handleClearCompleted,
  handleAdd,
  handleSearch,
  handleClearSearch,
  filter
}) => (
  <div className="uk-flex uk-flex-middle uk-flex-between">
    <div className="uk-grid uk-grid-small">
      <div>
        <button uk-marker="" onClick={handleAdd} />
      </div>

      <div>
        <span className="uk-text-meta uk-text-uppercase">add</span>
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
  handleClearCompleted: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClearSearch: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
};

export default AppBar;
