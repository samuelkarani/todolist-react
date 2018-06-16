import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Category from "../classes/category";

export default class Categories extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.inputRef = React.createRef();
  }

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleSubmit = e => {
    const name = e.target.value.trim().toLowerCase();
    if (name && e.which === 13) {
      this.props.handleAddCategory(name);
      this.setState({
        name: ""
      });
    }
  };

  handleClick = () => {
    const name = this.inputRef.current.value.trim().toLowerCase();
    if (name) {
      this.props.handleAddCategory(name);
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
    const { categories, handleRemoveCategory, handleEditCategory } = this.props;
    return (
      <div>
        <ul className="uk-tab-right" uk-tab="">
          <li className="uk-active">
            <a>All</a>
          </li>
          {categories.map(({ name, id }) => (
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
                <button
                  type="button"
                  uk-close=""
                  onClick={handleRemoveCategory}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="uk-inline">
          <button
            className="uk-form-icon uk-form-icon-flip"
            uk-icon="icon: plus"
            onClick={this.handleClick}
          />
          <input
            ref={this.inputRef}
            className="uk-input uk-form-width-small"
            type="text"
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit}
            onBlur={this.handleBlur}
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
  categories: PropTypes.arrayOf(PropTypes.instanceOf(Category))
};
