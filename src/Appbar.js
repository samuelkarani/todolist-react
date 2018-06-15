import React, { Component } from "react";

export default class Appbar extends Component {
  render() {
    return (
      <div className="uk-flex uk-flex-between uk-flex-middle uk-grid uk-margin">
        <div>
          <button uk-icon="star" />
          {/* <button className="uk-button uk-button-default">toggle star</button> */}
        </div>

        <div>
          <input
            type="checkbox"
            name="select_all"
            className="uk-checkbox uk-margin-right"
          />
          <button className="uk-button uk-button-default">
            clear completed
          </button>
        </div>
        <div>
          <button uk-icon="clock" />
          {/* <button className="uk-button uk-button-default">
            remove reminder
          </button> */}
        </div>
        <div>
          <button uk-icon="close" />
          {/* <button className="uk-button uk-button-danger">delete</button> */}
        </div>
      </div>
    );
  }
}
