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
    <div className="uk-grid uk-flex uk-flex-between uk-flex-middle">
      <div className="uk-grid uk-grid-small">
        <div>
          <input
            className="uk-checkbox"
            type="checkbox"
            checked={allCompleted}
            onChange={handleToggleCompleteAll}
            uk-tooltip="title: toggle complete all; pos: right"
          />
        </div>
      </div>

      <ul className="uk-subnav uk-subnav-pill">
        <li
          onClick={() => handleChangeStatus("all")}
          className={status === "all" ? "uk-active" : ""}
        >
          <a>All</a>
        </li>
        <li
          onClick={() => handleChangeStatus("active")}
          className={status === "active" ? "uk-active" : ""}
        >
          <a>Active</a>
        </li>
        <li
          onClick={() => handleChangeStatus("completed")}
          className={status === "completed" ? "uk-active" : ""}
        >
          <a>Completed</a>
        </li>
      </ul>

      <div className="uk-visible@m">
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
