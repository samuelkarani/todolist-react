import React, { Component } from "react";

export default class Categories extends Component {
  render() {
    return (
      <div>
        <ul class="uk-tab-left" uk-tab="">
          <li class="uk-active">
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
