import React, { Component } from "react";
import Todo from "./Todo";
import axios from "axios";
import moment from "moment";

const enrichTodoList = todos =>
  todos.map(todo =>
    Object.assign(todo, {
      date: moment(),
      isStarred: false
    })
  );

export default class TodoList extends Component {
  state = {
    todos: []
  };

  componentDidMount = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.data)
      .then(data => enrichTodoList(data))
      .then(todos => this.setState({ todos }))
      .catch(err => {
        console.error("could not fetch todos");
      });
  };

  handleRemove = id => {
    this.setState(prevState => {
      const todos = prevState.todos.filter(todo => todo.id !== id);
      return { todos };
    });
  };

  handleChangeDate = (date, id) => {
    this.setState(prevState => {
      const todos = prevState.todos.map(
        todo => (todo.id === id ? Object.assign(todo, { date }) : todo)
      );
      return { todos };
    });
  };

  handleToggleStar = (isStarred, id) => {
    this.setState(prevState => {
      const todos = prevState.todos.map(
        todo => (todo.id === id ? Object.assign(todo, { isStarred }) : todo)
      );
      return { todos };
    });
  };

  handleChangeTitle = (title, id) => {
    this.setState(prevState => {
      const todos = prevState.todos.map(
        todo => (todo.id === id ? Object.assign(todo, { title }) : todo)
      );
      return { todos };
    });
  };

  handleToggleComplete = (completed, id) => {
    this.setState(prevState => {
      const todos = prevState.todos.map(todo => {
        if (todo.id === id) {
          return Object.assign(todo, { completed });
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
    return (
      <div>
        <ul className="uk-list">
          {todos.map(todo => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              isStarred={todo.isStarred}
              date={todo.date}
              handleToggleComplete={this.handleToggleComplete}
              handleChangeTitle={this.handleChangeTitle}
              handleChangeDate={this.handleChangeDate}
              handleRemove={this.handleRemove}
              handleToggleStar={this.handleToggleStar}
            />
          ))}
        </ul>
      </div>
    );
  }
}
