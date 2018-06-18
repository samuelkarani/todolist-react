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

class App extends PureComponent {
  state = {
    todoList: [],
    allCompleted: false,
    filter: ""
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

  handleAddTodo = () => {
    this.setState(prevState => {
      const todoList = prevState.todoList.slice();
      todoList.unshift(new Todo());

      if (prevState.filter) {
      }
      return { todoList };
    });
  };

  handleRemoveTodo = id => {
    this.setState(prevState => {
      const todoList = prevState.todoList.filter(todo => todo.id !== id);
      return { todoList };
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

  handleFilter = () => {
    let todoList = this.state.todoList;
    const filter = this.state.filter;
    if (filter) todoList = todoList.filter(todo => todo.title.includes(filter));
    const itemsLeft = computeTodoLeft(todoList);
    return {
      todoList,
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
    if (this.state.createdCategory === true) {
      this.setState({
        createdCategory: false
      });
      if (this.state.updatedCategory === true) {
        this.setState({
          updatedCategory: false
        });
      }
    }
  }

  render() {
    const { allCompleted, filter } = this.state;
    const { todoList, itemsLeft } = this.handleFilter();

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
              <div className="uk-width-expand" uk-filter="target: .js-filter">
                <div className="uk-flex uk-flex-between uk-grid">
                  <ul className="uk-subnav uk-subnav-pill">
                    <li className="uk-active" uk-filter-control="">
                      <a>All</a>
                    </li>
                    <li uk-filter-control="[data-status='active']">
                      <a>Active</a>
                    </li>
                    <li uk-filter-control="[data-status='completed']">
                      <a>Completed</a>
                    </li>
                  </ul>
                  <div>
                    <p className="uk-text-meta uk-text-small">{`
                    ${itemsLeft} item${itemsLeft > 1 ? "s" : ""} left`}</p>
                  </div>
                </div>
                <TodoList
                  todoList={todoList}
                  handleEditTodo={this.handleEditTodo}
                  handleRemoveTodo={this.handleRemoveTodo}
                  handleDuplicateTodo={this.handleDuplicateTodo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
