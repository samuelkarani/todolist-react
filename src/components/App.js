import React, { PureComponent } from "react";
import axios from "axios";
import "./App.css";
import Todo from "./classes/todo";
import Category from "./classes/category";
import TodoList from "./TodoList";
import AppBar from "./AppBar";
import { Categories, FilterControls } from "./FilterControls";

const SEARCH_SHOW = 10;

const assignCategories = (todoList, categories) => {
  todoList.forEach(todo => {
    const randomIdx = Math.floor(Math.random() * categories.length);
    categories[randomIdx].addTodo(todo);
  });
  return todoList;
};
class App extends PureComponent {
  state = {
    todoList: [],
    allCompleted: false,
    filter: "",
    categories: [
      new Category({ name: "personal" }),
      new Category({ name: "work" })
    ]
  };

  componentDidMount = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.data)
      .then(todoList =>
        todoList.map(
          ({ title, completed, id }) => new Todo({ title, completed, id })
        )
      )
      .then(todoList => assignCategories(todoList, this.state.categories))
      .then(todoList => this.setState({ todoList }))
      .catch(() => {
        console.error("could not fetch todoList");
      });
  };

  handleSearch = phrase => {
    this.setState({
      filter: phrase.toLowerCase()
    });
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

  handleAdd = () => {
    this.setState(prevState => {
      const todoList = prevState.todoList.slice();
      todoList.unshift(new Todo());
      return { todoList };
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

  handleDuplicate = id => {
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

  handleAddCategory = name => {
    this.setState(prevState => {
      const categories = prevState.categories;
      categories.push(
        new Category({
          name
        })
      );
      return {
        categories: categories.slice()
      };
    });
  };

  handleFilter = () =>
    this.state.todoList.filter(todo => todo.title.includes(this.state.filter));

  render() {
    const { allCompleted, filter, categories } = this.state;
    const todos = this.handleFilter();
    return (
      <div>
        <div className="uk-section uk-section-xsmall">
          <div className="uk-container">
            <AppBar
              filter={filter}
              showSearch={todos.length > SEARCH_SHOW}
              allCompleted={allCompleted}
              handleAdd={this.handleAdd}
              handleClearCompleted={this.handleClearCompleted}
              handleToggleCompleteAll={this.handleToggleCompleteAll}
              handleSearch={this.handleSearch}
            />
            <hr />
            <div>
              <Categories
                categories={categories}
                handleAddCategory={this.handleAddCategory}
              />
            </div>
            <div uk-filter="target: .js-filter">
              <FilterControls />
              <TodoList
                todoList={todos}
                handleToggleComplete={this.handleToggleComplete}
                handleChangeTitle={this.handleChangeTitle}
                handleRemove={this.handleRemove}
                handleDuplicate={this.handleDuplicate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
