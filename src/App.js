import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";
import TodoList from "./TodoList";
import AppBar from "./AppBar";
import axios from "axios";

class App extends Component {
  state = {
    todoList: [],
    allCompleted: false
  };

  componentDidMount = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.data)
      .then(todoList => this.setState({ todoList }))
      .catch(err => {
        console.error("could not fetch todoList");
      });
  };

  handleClearCompleted = () => {
    this.setState(prevState => {
      const todoList = prevState.todoList.filter(
        todo => todo.completed === true
      );
      return { todoList };
    });
  };

  handleToggleCompleteAll = () => {
    this.setState(prevState => {
      let todoList = prevState.todoList;
      const allCompleted = !todoList.every(todo => todo.completed === true);
      todoList = todoList.map(todo =>
        Object.assign(todo, { completed: allCompleted })
      );
      return { todoList, allCompleted };
    });
  };

  handleRemove = id => {
    this.setState(prevState => {
      const todoList = prevState.todoList.filter(todo => todo.id !== id);
      return { todoList };
    });
  };

  handleChangeTitle = (title, id) => {
    this.setState(prevState => {
      const todoList = prevState.todoList.map(
        todo => (todo.id === id ? Object.assign(todo, { title }) : todo)
      );
      return { todoList };
    });
  };

  handleToggleComplete = (completed, id) => {
    this.setState(prevState => {
      const todoList = prevState.todoList.map(todo => {
        if (todo.id === id) {
          return Object.assign(todo, { completed });
        } else {
          return todo;
        }
      });
      return {
        todoList
      };
    });
  };

  render() {
    const { todoList, allCompleted } = this.state;
    return (
      <div>
        <div>
          <img src={logo} alt="" width="180" />
        </div>

        <div className="uk-section uk-section-xsmall">
          <div className="uk-container">
            <AppBar
              allCompleted={allCompleted}
              handleClearCompleted={this.handleClearCompleted}
              handleToggleCompleteAll={this.handleToggleCompleteAll}
            />
            <hr />
            <TodoList
              todoList={todoList}
              handleToggleComplete={this.handleToggleComplete}
              handleChangeTitle={this.handleChangeTitle}
              handleRemove={this.handleRemove}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
