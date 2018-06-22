import React, { PureComponent } from "react";
import axios from "axios";
import "../styles/app.css";
import Todo from "../classes/todo";
import TodoList from "./TodoList";
import AppBar from "./AppBar";
import Header from "./Header";

const INITIAL_TODO_LENGTH = 7;

function convertIdsToStrings(todoList) {
  return todoList.map(todo => {
    todo.id = todo.id.toString();
    return todo;
  });
}

function computeTodoLeft(todoList) {
  return todoList.reduce((prev, todo) => prev + (!todo.completed ? 1 : 0), 0);
}

export default class App extends PureComponent {
  state = {
    todoList: [],
    allCompleted: false,
    filter: "",
    status: "all",
    newId: null
  };

  handleSearch = phrase => {
    this.setState({
      filter: phrase
    });
  };

  handleClearSearch = () => {
    this.setState({ filter: "" });
  };

  handleClearCompleted = () => {
    this.setState(prevState => {
      const todoList = prevState.todoList.filter(
        todo => todo.completed !== true
      );
      return { todoList, allCompleted: false };
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

  handleChangeStatus = status => {
    this.setState({
      status
    });
  };

  handleAddTodo = () => {
    this.setState(prevState => {
      let updates = {};
      const todoList = prevState.todoList;
      const newTodo = new Todo();
      todoList.unshift(newTodo);
      updates = Object.assign(updates, { newId: newTodo.id });
      updates = Object.assign(updates, { todoList: todoList.slice() });
      if (prevState.filter) {
        updates = Object.assign(updates, { filter: "" });
      }
      updates = Object.assign(updates, { status: "all" });
      return updates;
    });
  };

  handleEditTodo = ({ completed, title, id }) => {
    this.setState(prevState => {
      const todoList = prevState.todoList.map(todo => {
        if (todo.id === id) {
          todo.editTodo({
            completed,
            title
          });
          return todo;
        }
        return todo;
      });
      return { todoList };
    });
  };

  handleDuplicateTodo = id => {
    this.setState(prevState => {
      const todoList = prevState.todoList;
      const idx = todoList.findIndex(todo => todo.id === id);
      const todo = todoList[idx];
      const duplicatedTodo = new Todo({
        completed: todo.completed,
        title: todo.title
      });
      todoList.splice(idx + 1, 0, duplicatedTodo);
      return {
        todoList: todoList.slice(),
        newId: duplicatedTodo.id
      };
    });
  };

  handleRemoveTodo = id => {
    this.setState(prevState => {
      const todoList = prevState.todoList.filter(todo => todo.id !== id);
      return { todoList };
    });
  };

  handleFilter = () => {
    let filteredTodoList = this.state.todoList;
    const { filter, status } = this.state;
    if (filter)
      filteredTodoList = filteredTodoList.filter(todo =>
        todo.title.includes(filter)
      );
    const itemsLeft = computeTodoLeft(filteredTodoList);
    if (status === "active")
      filteredTodoList = filteredTodoList.filter(
        todo => todo.completed === false
      );
    if (status === "completed")
      filteredTodoList = filteredTodoList.filter(
        todo => todo.completed === true
      );
    return {
      filteredTodoList,
      itemsLeft
    };
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.data)
      .then(data => data.slice(0, INITIAL_TODO_LENGTH))
      .then(todoList => convertIdsToStrings(todoList))
      .then(todoList =>
        todoList.map(
          ({ title, completed, id }) => new Todo({ title, completed, id })
        )
      )
      .then(todoList => this.setState({ todoList }))
      .catch(() => {
        console.error("could not fetch todoList");
      });
  }

  render() {
    const { allCompleted, filter, status, todoList, newId } = this.state;
    const { filteredTodoList, itemsLeft } = this.handleFilter();

    return (
      <div>
        <div className="uk-section uk-section-xsmall">
          <div className="uk-container">
            <AppBar
              filter={filter}
              handleAdd={this.handleAddTodo}
              handleClearCompleted={this.handleClearCompleted}
              handleSearch={this.handleSearch}
              handleClearSearch={this.handleClearSearch}
            />
            <hr />
            <div className="uk-grid">
              {todoList.length > 0 && (
                <div className="uk-width-expand">
                  <Header
                    allCompleted={allCompleted}
                    handleToggleCompleteAll={this.handleToggleCompleteAll}
                    handleChangeStatus={this.handleChangeStatus}
                    itemsLeft={itemsLeft}
                    status={status}
                  />
                  <hr />
                  <TodoList
                    todoList={filteredTodoList}
                    handleEditTodo={this.handleEditTodo}
                    handleRemoveTodo={this.handleRemoveTodo}
                    handleDuplicateTodo={this.handleDuplicateTodo}
                    newId={newId}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
