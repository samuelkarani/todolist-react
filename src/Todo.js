export default class Todo {
  constructor(props) {
    if (props && props.id) this.id = props.id;
    else this.id = Date.now();

    if (props && props.title) this.title = props.title;
    else this.title = "";

    if (props && props.completed) this.completed = props.completed;
    else this.completed = false;
  }
}
