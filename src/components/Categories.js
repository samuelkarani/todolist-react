import React, { PureComponent, createRef } from "react";
import PropTypes from "prop-types";
import CategoryClass from "../classes/category";
import Category from "./Category";

export default class Categories extends PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }

  state = {
    name: ""
  };

  blurInput() {
    this.inputRef.current.blur();
  }

  handleChange = () => {
    const name = this.inputRef.current.value.trim().toLowerCase();
    this.setState({
      name
    });
  };

  handleKeyDown = e => {
    const { name } = this.state;
    if (name && e.which === 13) {
      this.props.handleAddCategory(name);
    }
  };

  handleBlur = () => {
    this.setState({
      name: ""
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.createdCategory && this.props.createdCategory) {
      this.setState({
        name: ""
      });
      this.blurInput();
    }
  }

  render() {
    const {
      categories,
      handleRemoveCategoryFilter,
      updatedCategory
    } = this.props;
    return (
      <div>
        <ul className="uk-tab-right" uk-tab="">
          <li className="uk-active">
            <a onClick={handleRemoveCategoryFilter}>All</a>
          </li>
          {categories.map(category => (
            <Category
              key={category.id}
              category={category}
              handleEditCategory={this.props.handleEditCategory}
              handleRemoveCategory={this.props.handleRemoveCategory}
              handleSetCategoryFilter={this.props.handleSetCategoryFilter}
              updatedCategory={updatedCategory}
            />
          ))}
        </ul>

        <div>
          <input
            ref={this.inputRef}
            className="uk-input uk-form-width-small"
            type="text"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleBlur}
            value={this.state.name}
          />
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  handleAddCategory: PropTypes.func.isRequired,
  handleEditCategory: PropTypes.func.isRequired,
  handleRemoveCategory: PropTypes.func.isRequired,
  handleSetCategoryFilter: PropTypes.func.isRequired,
  handleRemoveCategoryFilter: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.instanceOf(CategoryClass)).isRequired,
  createdCategory: PropTypes.bool.isRequired,
  updatedCategory: PropTypes.bool.isRequired
};
