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
    this.inputRef = React.createRef();
  }

  handleClick = () => {
    this.setState({
      isEditing: true
    });
    // this.inputRef.current.focus();
  };

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleBlur = (e, id) => {
    this.setState({
      isEditing: false
    });
    // attempted ref
    this.props.handleEditCategory(
      this.inputRef.current.value.trim().toLowerCase(),
      id
    );
    // this.inputRef.current.blur();
  };

  handleSave = (e, id) => {
    if (e.which === 13) {
      this.props.handleEditCategory(e.target.value.trim().toLowerCase(), id);
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
            ref={this.inputRef}
            className="uk-input uk-form-blank uk-form-width-small"
            type="text"
            value={name}
            onChange={this.handleChange}
            onKeyDown={e => this.handleSave(e, category.id)}
            onBlur={e => this.handleBlur(e, category.id)}
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
                onClick={() => handleRemoveCategory(category.id)}
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
