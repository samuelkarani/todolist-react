import React, { Component } from "react";

export default class Appbar extends Component {
  render() {
    return (
      <div className="uk-flex uk-flex-middle uk-grid uk-margin">
        <div>
          <input type="checkbox" name="select_all" className="uk-checkbox" />
        </div>

        <div>
          <button className="uk-button uk-button-default">toggle star</button>
        </div>

        <div>
          <button className="uk-button uk-button-default">
            toggle complete
          </button>
        </div>
        <div>
          <button className="uk-button uk-button-default">
            remove reminder
          </button>
        </div>
        <div>
          <button className="uk-button uk-button-danger">delete</button>
        </div>
      </div>
    );
  }
}
