import React, { Component } from "react";
import Todo from "./Todo";

export default class TodoList extends Component {
  render() {
    return (
      <div>
        <ul> {[1, 2, 3].map(todo => <Todo key={todo} />)} </ul>
      </div>
    );
  }
}
