import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";
import TodoList from "./TodoList";

class App extends Component {
  render() {
    return (
      <div>
        <img src={logo} alt="" width="300" />
        <div className="uk-section">
          <div className="uk-container">
            <TodoList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
