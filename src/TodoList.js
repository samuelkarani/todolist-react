import React, { Component } from "react";
import Todo from "./Todo";
import axios from "axios";

export default class TodoList extends Component {
  state = {
    todos: []
  };
  componentDidMount = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(result => this.setState({ todos: result.data }))
      .catch(err => {
        console.error("could not fetch todos");
      });
  };

  handleChangeTitle = (title, id) => {
    console.log(title, id);

    this.setState(prevState => {
      const todos = prevState.todos.map(
        todo => (todo.id === id ? Object.assign({}, todo, { title }) : todo)
      );
      return { todos };
    });
  };

  handleToggleComplete = (bool, id) => {
    this.setState(prevState => {
      const todos = prevState.todos.map(todo => {
        if (todo.id === id) {
          return Object.assign({}, todo, { completed: bool });
        } else {
          return todo;
        }
      });
      return {
        todos
      };
    });
  };

  render() {
    const { todos } = this.state;
    console.log("rerender");
    return (
      <div>
        <ul className="uk-list">
          {todos.map(todo => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              handleToggleComplete={this.handleToggleComplete}
              handleChangeTitle={this.handleChangeTitle}
            />
          ))}
        </ul>
      </div>
    );
  }
}
