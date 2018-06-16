import React from "react";
import PropTypes from "prop-types";

const Search = ({ handleSearch, filter }) => {
  return (
    <form className="uk-search uk-search-default">
      <a href="" uk-search-icon="" />
      <input
        className="uk-search-input uk-form-small uk-form-icon uk-form-icon-flip"
        type="search"
        placeholder="Search..."
        onChange={e => handleSearch(e.target.value)}
        value={filter}
        uk-icon="icon: close"
      />
    </form>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
};

export default Search;
