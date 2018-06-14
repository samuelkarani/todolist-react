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

  toggleComplete = (bool, id) => {
    this.setState(prevState => {
      const todos = prevState.todos.map(todo => {
        if (todo.id === id) {
          return Object.assign({}, todo, { completed: bool });
        } else {
          return todo;
        }
      });
    });
  };

  render() {
    const { todos } = this.state;
    return (
      <div>
        <ul className="uk-list">
          {todos.map(todo => (
            <Todo
              key={todo.id}
              id={todo.id}
              description={todo.title}
              completed={todo.completed}
              toggleComplete={this.toggleComplete}
            />
          ))}
        </ul>
      </div>
    );
  }
}
