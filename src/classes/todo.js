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

  addCategory(name) {
    this.categories.push(name);
    this.categories = this.categories.slice();
  }

  editTodo({ completed, title }) {
    if (typeof completed === "boolean") {
      this.completed = completed;
    }

    if (typeof title === "string") {
      this.title = title;
    }
  }
}
