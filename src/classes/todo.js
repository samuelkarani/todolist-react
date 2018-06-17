import { ID } from "../utils";
export default class Todo {
  constructor(props) {
    if (props && props.id) this.id = props.id;
    else this.id = ID();

    if (props && props.title) this.title = props.title;
    else this.title = "";

    if (props && props.completed) this.completed = props.completed;
    else this.completed = false;

    this.categories = [];
  }

  editTodo({ completed, title }) {
    if (typeof completed === "boolean") {
      this.completed = completed;
    }

    if (typeof title === "string") {
      this.title = title;
    }
  }

  addCategory(name) {
    this.categories.push(name);
    this.categories = this.categories.slice();
  }

  removeCategory(name) {
    this.categories = this.categories.filter(
      categoryName => categoryName !== name
    );
  }

  containsCategory(name) {
    return this.categories.includes(name);
  }
}
