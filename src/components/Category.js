import React, { PureComponent } from "react";
import CategoryClass from "../classes/category";
import PropTypes from "prop-types";

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
    if (e.which === 13) {
      this.props.handleEditCategory(e.target.value.trim());
      this.setState({
        isEditing: false
      });
    }
  };

  render() {
    const { category, handleRemoveCategory } = this.props;
    const { isEditing } = this.state;
    return (
      <li key={category.id}>
        {isEditing ? (
          <input
            class="uk-input uk-form-blank uk-form-width-small"
            type="text"
            value={category.name}
            onChange={this.handleChange}
            onKeyDown={this.handleSave}
          />
        ) : (
          <a className="uk-flex uk-flex-between">
            <span>{category.name}</span>
            <span>
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
            </span>
          </a>
        )}
      </li>
    );
  }
}

Category.propTypes = {
  handleEditCategory: PropTypes.func.isRequired,
  handleRemoveCategory: PropTypes.func.isRequired,
  category: PropTypes.instanceOf(CategoryClass)
};
