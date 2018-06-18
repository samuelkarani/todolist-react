import React, { PureComponent } from "react";
import axios from "axios";
import "../styles/app.css";
import Todo from "../classes/todo";
import TodoList from "./TodoList";
import AppBar from "./AppBar";

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
    status: "all"
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
      todoList.unshift(new Todo());
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
        todoList: todoList.slice()
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

  componentDidUpdate(prevProps, prevState) {
    let updates = {};
    if (this.state.createdCategory === true) {
      Object.assign(updates, { createdCategory: false });
      if (this.state.updatedCategory === true) {
        Object.assign(updates, { updatedCategory: false });
      }
      this.setState(updates);
    }
  }

  render() {
    const { allCompleted, filter, status, todoList } = this.state;
    const { filteredTodoList, itemsLeft } = this.handleFilter();

    return (
      <div>
        <div className="uk-section uk-section-xsmall">
          <div className="uk-container">
            <AppBar
              filter={filter}
              allCompleted={allCompleted}
              handleAdd={this.handleAddTodo}
              handleClearCompleted={this.handleClearCompleted}
              handleToggleCompleteAll={this.handleToggleCompleteAll}
              handleSearch={this.handleSearch}
              handleClearSearch={this.handleClearSearch}
              itemsLeft={itemsLeft}
            />
            <hr />
            <div className="uk-grid">
              {todoList.length > 0 && (
                <div className="uk-width-expand" uk-filter="target: .js-filter">
                  <div className="uk-grid uk-child-width-1-3@s uk-flex-middle">
                    <div className="uk-grid uk-grid-small">
                      <div>
                        <input
                          className="uk-checkbox"
                          type="checkbox"
                          checked={allCompleted}
                          onChange={this.handleToggleCompleteAll}
                          filter={filter}
                        />
                      </div>

                      <div>
                        <span className="uk-text-margin-small-left uk-text-meta uk-text-uppercase">
                          toggle complete all
                        </span>
                      </div>
                    </div>

                    <ul className="uk-subnav uk-subnav-pill">
                      <li
                        onClick={() => this.handleChangeStatus("all")}
                        className={status === "all" ? "uk-active" : ""}
                        uk-filter-control=""
                      >
                        <a>All</a>
                      </li>
                      <li
                        onClick={() => this.handleChangeStatus("active")}
                        className={status === "active" ? "uk-active" : ""}
                        uk-filter-control="[data-status='active']"
                      >
                        <a>Active</a>
                      </li>
                      <li
                        onClick={() => this.handleChangeStatus("completed")}
                        className={status === "completed" ? "uk-active" : ""}
                        uk-filter-control="[data-status='completed']"
                      >
                        <a>Completed</a>
                      </li>
                    </ul>

                    <div className="uk-text-right">
                      <p className="uk-text-meta uk-text-small">{`
                    ${itemsLeft} item${itemsLeft > 1 ? "s" : ""} left`}</p>
                    </div>
                  </div>
                  <hr />
                  <TodoList
                    todoList={filteredTodoList}
                    handleEditTodo={this.handleEditTodo}
                    handleRemoveTodo={this.handleRemoveTodo}
                    handleDuplicateTodo={this.handleDuplicateTodo}
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
