import React from "react";
import PropTypes from "prop-types";

export function Categories({ categories, handleAddCategory }) {
  return (
    <div>
      <ul className="uk-tab-right" uk-tab="">
        <li className="uk-active">
          <a>All</a>
        </li>
        {categories.map((category, idx) => (
          <li key={idx}>
            <a>{category.name}</a>
          </li>
        ))}
        <li>
          <a onClick={handleAddCategory}>
            <span uk-icon="icon: plus" className="uk-margin-small-right" />
            add
          </a>
        </li>
      </ul>
    </div>
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  handleAddCategory: PropTypes.func.isRequired
};

export function FilterControls() {
  return (
    <ul className="uk-subnav uk-subnav-pill">
      <li className="uk-active" uk-filter-control="">
        <a>All</a>
      </li>
      <li uk-filter-control="[data-status='active']">
        <a>Active</a>
      </li>
      <li uk-filter-control="[data-status='completed']">
        <a>Completed</a>
      </li>
    </ul>
  );
}
