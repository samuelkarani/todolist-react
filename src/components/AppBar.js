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
    <div className="uk-grid uk-grid-small uk-flex-middle">
      <div>
        <button
          className="uk-icon-button"
          uk-icon="plus"
          onClick={handleAdd}
          style={{
            backgroundColor: "#ee395b",
            color: "#fff"
          }}
        />
      </div>

      <div className="uk-visible@m">
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
        onClick={handleClearCompleted}
        className="uk-icon-button uk-margin-small-right uk-hidden@m"
        uk-icon="close"
      />
      <button
        className="uk-button uk-button-small uk-button-default uk-visible@m"
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
