import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";
import TodoList from "./TodoList";
import Categories from "./Categories";
import Appbar from "./Appbar";

class App extends Component {
  render() {
    return (
      <div>
        <img src={logo} alt="" width="300" />
        <div className="uk-section">
          <div className="uk-container">
            <div>
              <Appbar />
            </div>
            <div className="uk-flex uk-grid">
              <div>
                <Categories />
              </div>
              <div className="uk-width-expand">
                <TodoList />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
