import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CategoryClass from "../classes/category";
import Category from "./Category";

export default class Categories extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleChange = e => {
    this.setState({
      name: e.target.value.trim().toLowerCase()
    });
  };

  handleSave = e => {
    const { name } = this.state;
    if (name && e.which === 13) {
      if (this.props.handleAddCategory(name))
        this.setState({
          name: ""
        });
    }
  };

  handleClick = () => {
    const { name } = this.state;
    if (name) {
      if (this.props.handleAddCategory(name))
        this.setState({
          name: ""
        });
    }
  };

  handleBlur = () => {
    this.setState({
      name: ""
    });
  };

  render() {
    const { categories, handleRemoveCategoryFilter } = this.props;
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
            />
          ))}
        </ul>

        <div className="uk-inline">
          <a
            className="uk-form-icon uk-form-icon-flip"
            uk-icon="icon: plus"
            onClick={this.handleClick}
          />

          <input
            className="uk-input uk-form-width-small"
            type="text"
            onChange={this.handleChange}
            onKeyDown={this.handleSave}
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
  categories: PropTypes.arrayOf(PropTypes.instanceOf(CategoryClass)).isRequired
};
