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

  handleSave = e => {
    this.props.handleEditCategory;
  };
  render() {
    const { category, handleRemoveCategory } = this.props;
    return (
      <li key={id}>
        {isEditing ? (
          <input
            class="uk-input uk-form-blank uk-form-width-small"
            type="text"
            value={name}
          />
        ) : (
          <a className="uk-flex uk-flex-between">
            <span>{name}</span>
            <button
              href=""
              className="uk-icon-link"
              uk-icon="pencil"
              onClick={this.handleEdit}
            />
            <button
              type="button"
              uk-close=""
              onClick={e => handleRemoveCategory(category.id)}
            />
          </a>
        )}
      </li>
    );
  }
}
