import React from "react";

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
