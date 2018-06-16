import React from "react";
import PropTypes from "prop-types";

const Search = ({ handleSearch, handleClearSearch, filter }) => {
  return (
    <form
      className="uk-search uk-search-default"
      onSubmit={e => e.preventDefault()}
    >
      <span uk-search-icon="" />
      <input
        className="uk-search-input"
        type="search"
        placeholder="Search..."
        onChange={e => handleSearch(e.target.value)}
        value={filter}
      />
      <button
        className="uk-form-icon uk-form-icon-flip"
        uk-icon="icon: close"
        onClick={handleClearSearch}
      />
    </form>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleClearSearch: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
};

export default Search;
