import React from "react";
import PropTypes from "prop-types";

const Search = ({ handleFilter, handleClearFilter, filter }) => {
  return (
    <form
      className="uk-search uk-search-default"
      onSubmit={e => e.preventDefault()}
    >
      <span uk-search-icon="" />
      <input
        className="uk-search-input uk-form-small uk-form-width-medium"
        type="search"
        placeholder="Search..."
        onChange={e => handleFilter(e.target.value.toLowerCase())}
        value={filter}
      />
      {filter && (
        <button
          className="uk-form-icon uk-form-icon-flip"
          uk-icon="icon: close"
          onClick={handleClearFilter}
        />
      )}
    </form>
  );
};

Search.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  handleClearFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
};

export default Search;
