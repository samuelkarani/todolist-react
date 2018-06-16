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
    const { categories } = this.props;
    return (
      <div>
        <ul className="uk-tab-right" uk-tab="">
          <li className="uk-active">
            <a>All</a>
          </li>
          {categories.map(({ name, id }) => (
            <li key={id}>
              <a>{name}</a>
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
  handleEditCategories: PropTypes.func.isRequired,
  handleRemoveCategories: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.instanceOf(Category))
};
