import React from "react";
import PropTypes from "prop-types";

const Header = ({
  allCompleted,
  handleToggleCompleteAll,
  handleChangeStatus,
  itemsLeft,
  status
}) => {
  return (
    <div className="uk-grid uk-child-width-1-3@s uk-flex-middle">
      <div className="uk-grid uk-grid-small">
        <div>
          <input
            className="uk-checkbox"
            type="checkbox"
            checked={allCompleted}
            onChange={handleToggleCompleteAll}
          />
        </div>

        <div>
          <span className="uk-text-margin-small-left uk-text-meta uk-text-uppercase">
            toggle complete all
          </span>
        </div>
      </div>

      <ul className="uk-subnav uk-subnav-pill">
        <li
          onClick={() => handleChangeStatus("all")}
          className={status === "all" ? "uk-active" : ""}
          uk-filter-control=""
        >
          <a>All</a>
        </li>
        <li
          onClick={() => handleChangeStatus("active")}
          className={status === "active" ? "uk-active" : ""}
          uk-filter-control="[data-status='active']"
        >
          <a>Active</a>
        </li>
        <li
          onClick={() => handleChangeStatus("completed")}
          className={status === "completed" ? "uk-active" : ""}
          uk-filter-control="[data-status='completed']"
        >
          <a>Completed</a>
        </li>
      </ul>

      <div className="uk-text-right">
        <p className="uk-text-meta uk-text-small">{`
        ${itemsLeft} item${itemsLeft > 1 ? "s" : ""} left`}</p>
      </div>
    </div>
  );
};

Header.propTypes = {
  status: PropTypes.string.isRequired,
  allCompleted: PropTypes.bool.isRequired,
  itemsLeft: PropTypes.number.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
  handleToggleCompleteAll: PropTypes.func.isRequired
};

export default Header;
