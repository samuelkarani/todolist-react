import Todo from "./todo";
class Category {
  constructor() {
    this.todoItems = [];
  }

  addTodo(todo) {
    if (todo instanceof Todo) todoItems = this.todoItems.push(todo);
    this.todoItems = this.todoItems.slice();
  }

  removeTodo(id) {
    this.todoItems = this.todoItems.filter(todo => todo.id !== id);
  }
}
