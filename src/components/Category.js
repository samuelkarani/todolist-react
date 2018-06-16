import React, { PureComponent } from "react";

export default class Category extends PureComponent {
  state = {
    isEditing: false
  };

  handleEdit = () => {
    this.setState({
      isEditing: true
    });
  };

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleSave = e => {};
  render() {
    return (
      <li key={id}>
        <a className="uk-flex uk-flex-between">
          <span>{name}</span>
          <input
            class="uk-input uk-form-blank uk-form-width-small"
            type="text"
            value={name}
            hidden={isEditing}
          />

          <button
            href=""
            className="uk-icon-link"
            uk-icon="pencil"
            onClick={handleEditCategory}
          />
          <button type="button" uk-close="" onClick={handleRemoveCategory} />
        </a>
      </li>
    );
  }
}
