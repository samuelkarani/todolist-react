export function assignCategories(todoList, categories) {
  todoList.forEach(todo => {
    const randomIdx = Math.floor(Math.random() * categories.length);
    categories[randomIdx].addTodo(todo);
  });
  return todoList;
}

export function duplicatePreset(lst, item) {}
