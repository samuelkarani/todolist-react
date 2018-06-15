import React from "react";
import PropTypes from "prop-types";

export class Categories extends React.Component {
  state = {
    name: ""
  };

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleSubmit = e => {
    const name = e.target.value.trim();
    this.props.handleAddCategory();
  };

  handleBlur = () => {};

  render() {
    const { categories } = this.props;
    return (
      <div>
        <ul className="uk-tab-right" uk-tab="">
          <li className="uk-active">
            <a>All</a>
          </li>
          {categories.map((category, idx) => (
            <li key={idx}>
              <a>{category.name}</a>
            </li>
          ))}
          <li>
            <div className="uk-inline">
              <a
                className="uk-form-icon uk-form-icon-flip"
                href="#"
                uk-icon="icon: plus"
                onClick={this.handleSubmit}
              />
              <input
                value={category}
                placeholder="category"
                className="uk-input"
                type="text"
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
                onBlur={this.handleBlur}
              />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  handleAddCategory: PropTypes.func.isRequired
};
