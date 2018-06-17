import React, { PureComponent } from "react";
import axios from "axios";
import "../styles/app.css";
import Todo from "../classes/todo";
import Category from "../classes/category";
import TodoList from "./TodoList";
import AppBar from "./AppBar";
import Categories from "./Categories";

function assignCategories(todoList, categories) {
  todoList.forEach(todo => {
    const randomIdx = Math.floor(Math.random() * categories.length);
    const category = categories[randomIdx];
    category.addTodo(todo);
    todo.addCategory(category.name);
  });
  return todoList;
}

function isDuplicatePresent(categories, name) {
  return categories.some(category => category.name === name);
}

function convertIdsToStrings(todoList) {
  return todoList.map(todo => {
    todo.id = todo.id.toString();
    return todo;
  });
}

function removeCategoryFromTodoList(todoList, name) {
  return todoList.map(todo => {
    if (todo.containsCategory(name)) {
      todo.removeCategory(name);
      return todo;
    } else {
      return todo;
    }
  });
}

class App extends PureComponent {
  state = {
    todoList: [],
    allCompleted: false,
    filter: "",
    categoryFilter: "",
    categories: [
      new Category({ name: "personal" }),
      new Category({ name: "work" })
    ]
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
      .then(todoList => assignCategories(todoList, this.state.categories))
      .then(todoList => this.setState({ todoList }))
      .catch(() => {
        console.error("could not fetch todoList");
      });
  }

  handleSearch = phrase => {
    this.setState({
      filter: phrase
    });
  };

  handleClearSearch = () => {
    this.setState({ filter: "" });
  };

  handleSetCategoryFilter = name => {
    this.setState({
      categoryFilter: name
    });
  };

  handleRemoveCategoryFilter = () => {
    this.setState({
      categoryFilter: ""
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

  handleAddTodo = () => {
    this.setState(prevState => {
      const todoList = prevState.todoList.slice();
      todoList.unshift(new Todo());
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

  handleAddCategory = name => {
    let bool;
    this.setState(prevState => {
      const categories = prevState.categories;
      bool = isDuplicatePresent(categories, name);
      if (!bool)
        categories.push(
          new Category({
            name
          })
        );
      return {
        categories: categories.slice()
      };
    });
    return bool;
  };

  handleEditCategory = (name, id) => {
    let bool;
    this.setState(prevState => {
      let categories = prevState.categories;
      bool = isDuplicatePresent(categories, name);
      if (!bool) {
        categories = categories.map(category => {
          if (category.id === id) {
            category.editName(name);
            return category;
          } else {
            return category;
          }
        });
      }
      return {
        categories
      };
    });
    return bool;
  };

  handleRemoveCategory = name => {
    this.handleRemoveCategoryFilter();
    this.setState(prevState => {
      const categories = prevState.categories.filter(
        category => category.name !== name
      );
      const todoList = removeCategoryFromTodoList(prevState.todoList, name);
      return {
        categories,
        todoList
      };
    });
  };

  handleFilter = () => {
    let todoList = this.state.todoList;
    const filter = this.state.filter;
    if (filter) todoList = todoList.filter(todo => todo.title.includes(filter));
    const categoryFilter = this.state.categoryFilter;

    if (categoryFilter) {
      todoList = todoList.filter(todo =>
        todo.categories.includes(categoryFilter)
      );
    }
    return todoList;
  };

  render() {
    const { allCompleted, filter, categories } = this.state;
    const todoList = this.handleFilter();
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
            />
            <hr />
            <div className="uk-grid">
              <div>
                <Categories
                  categories={categories}
                  handleAddCategory={this.handleAddCategory}
                  handleRemoveCategory={this.handleRemoveCategory}
                  handleEditCategory={this.handleEditCategory}
                  handleSetCategoryFilter={this.handleSetCategoryFilter}
                  handleRemoveCategoryFilter={this.handleRemoveCategoryFilter}
                />
              </div>
              <div className="uk-width-expand" uk-filter="target: .js-filter">
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
