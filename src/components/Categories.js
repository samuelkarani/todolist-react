import React from "react";
import PropTypes from "prop-types";

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.input = React.createRef();
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
    const name = this.state.name.trim().toLowerCase();
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
    const { name } = this.state;
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
              <button
                className="uk-form-icon uk-form-icon-flip"
                uk-icon="icon: plus"
                onClick={this.handleClick}
              />
              <input
                ref={this.input}
                value={name}
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
  handleAddCategory: PropTypes.func.isRequired
};
