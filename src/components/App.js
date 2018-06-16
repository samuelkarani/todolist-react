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
      if (!isDuplicatePresent(categories, name))
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

  handleRemoveCategory = id => {
    this.setState(prevState => {
      const categories = prevState.categories.filter(
        category => category.id !== id
      );
      return {
        categories
      };
    });
  };

  handleEditCategory = (name, id) => {
    this.setState(prevState => {
      const categories = prevState.categories.map(category => {
        if (category.id === id) {
          category.editName(name);
          return category;
        } else {
          return category;
        }
      });
      return {
        categories
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
              handleAdd={this.handleAdd}
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
                  handleToggleComplete={this.handleToggleComplete}
                  handleChangeTitle={this.handleChangeTitle}
                  handleRemove={this.handleRemove}
                  handleDuplicate={this.handleDuplicate}
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
