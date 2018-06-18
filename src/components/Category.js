import React, { PureComponent } from "react";
import CategoryClass from "../classes/category";
import PropTypes from "prop-types";

export default class Category extends PureComponent {
  state = {
    isEditing: false,
    name: this.props.category.name
  };

  handleClick = () => {
    this.props.handleSetCategoryFilter(this.state.name);
    this.setState({
      isEditing: true
    });
  };

  handleChange = e => {
    this.setState({
      name: e.target.value.trim().toLowerCase()
    });
  };

  handleBlur = (_, id) => {
    this.setState({
      isEditing: false
    });
    const { name } = this.state;
    if (name) {
      this.props.handleEditCategory(name);
    } else {
      this.setState({
        name: this.props.category.name
      });
    }
  };

  handleKeyDown = (e, id) => {
    const { name } = this.state.name;
    if (e.which === 13) {
      this.setState({
        isEditing: false
      });
      if (name) {
        this.props.handleEditCategory(name);
      } else {
        this.setState({
          name: this.props.category.name
        });
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // handles duplicate update failures
    if (!this.state.isEditing && prevState.isEditing) {
      if (!this.props.updatedCategory) {
        this.setState({
          name: prevProps.category.name
        });
      }
    }
  }

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
            onKeyDown={e => this.handleKeyDown(e, category.id)}
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
  category: PropTypes.instanceOf(CategoryClass),
  updatedCategory: PropTypes.bool.isRequired
};
