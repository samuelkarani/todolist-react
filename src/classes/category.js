import Todo from "./todo";
export default class Category {
  constructor({ name }) {
    this.name = name;
    this.todoItems = [];
  }

  addTodo(todo) {
    if (todo instanceof Todo) {
      this.todoItems.push(todo);
    }
    this.todoItems = this.todoItems.slice();
  }

  removeTodo(id) {
    this.todoItems = this.todoItems.filter(todo => todo.id !== id);
  }

  editName(name) {
    this.name = name;
  }
}
