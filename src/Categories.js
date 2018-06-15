import React, { Component } from "react";

export default class Categories extends Component {
  render() {
    return (
      <div>
        <ul className="uk-tab-left" uk-tab="">
          <li className="uk-active">
            <a href="#">Personal</a>
          </li>
          <li>
            <a href="#">Work</a>
          </li>
        </ul>
      </div>
    );
  }
}
