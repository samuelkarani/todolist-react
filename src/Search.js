import React from "react";
import PropTypes from "prop-types";

const Search = ({ handleSearch, filter }) => {
  return (
    <form className="uk-search uk-search-default">
      <a href="" className="uk-search-icon-flip" uk-search-icon="" />
      <input
        className="uk-search-input"
        type="search"
        placeholder="Search..."
        onChange={e => handleSearch(e.target.value)}
        value={filter}
      />
    </form>
  );
};

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
};

export default Search;
