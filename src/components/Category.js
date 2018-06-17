import React, { PureComponent } from "react";
import CategoryClass from "../classes/category";
import PropTypes from "prop-types";

export default class Category extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: props.category.name
    };
  }

  handleClick = () => {
    this.props.handleSetCategoryFilter(this.state.name);
    this.setState({
      isEditing: true
    });
  };

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleBlur = (e, id) => {
    const name = e.target.value.trim().toLowerCase();
    if (name) {
      if (!this.props.handleEditCategory(name, id))
        this.setState({
          name: this.props.category.name
        });
    }
    this.setState({
      isEditing: false
    });
  };

  handleSave = (e, id) => {
    const name = e.target.value.trim().toLowerCase();
    if (name && e.which === 13) {
      this.props.handleEditCategory(name, id);
      this.setState({
        isEditing: false
      });
    }
  };

  render() {
    const {
      category,
      handleRemoveCategory,
      handleSetCategoryFilter
    } = this.props;
    const { isEditing, name } = this.state;
    return (
      <li key={category.id}>
        {isEditing ? (
          <input
            className="uk-input uk-form-blank uk-form-width-small"
            type="text"
            value={name}
            onChange={this.handleChange}
            onKeyDown={e => this.handleSave(e, category.id)}
            onBlur={e => this.handleBlur(e, category.id)}
            autoFocus
          />
        ) : (
          <a className="uk-flex">
            <span onClick={() => handleSetCategoryFilter(name)}>{name}</span>
            <span>
              <button
                href=""
                className="uk-icon-link"
                uk-icon="pencil"
                onClick={this.handleClick}
              />
              <button
                type="button"
                uk-close=""
                onClick={() => handleRemoveCategory(category.name)}
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
  handleSetCategoryFilter: PropTypes.func.isRequired,
  category: PropTypes.instanceOf(CategoryClass)
};
