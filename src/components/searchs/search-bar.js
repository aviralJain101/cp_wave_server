import React from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import htmlElementAttributes from 'react-html-attributes';
import { debounce, isNil, pick } from 'lodash';
import Suggestions from './suggestions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedSuggestion: null,
      isFocused: false,
      searchTerm: null,
      value: ''
    };

    // this.attributes = pick(props, htmlElementAttributes.input);

    autoBind(
      this,
      'clearInput',
      'handleChange',
      'handleClick',
      'handleHover',
      'handleKeyDown',
      'handleSelection',
      'search',
      'toggleFocus'
    );

    this.handleDebouncedChange = debounce(this.handleDebouncedChange, props.delay);
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.input.focus();
    }

    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  getNextIndex(current, last, isScrollingDown) {
    let next = null;

    if (isScrollingDown && current != last) {
      next = isNil(current) ? 0 : current + 1;
    } else if (!isScrollingDown && current != 0) {
      next = isNil(current) ? last : current - 1;
    }

    return next;
  }

  setFocusedSuggestion(isScrollingDown) {
    const { focusedSuggestion: current, searchTerm } = this.state;
    const { suggestions } = this.props;
    const last = suggestions.length - 1;
    const next = this.getNextIndex(current, last, isScrollingDown);
    this.setState({
      focusedSuggestion: next,
      value: suggestions[next] || searchTerm
    });
  }

  clearInput() {
    this.setState({
      focusedSuggestion: null,
      searchTerm: null,
      value: ''
    });

    this.input.focus();
    this.props.onClear();
  }

  toggleFocus() {
    this.setState({
      isFocused: !this.state.isFocused
    });
  }

  handleClick(event) {
    if (!this.container.contains(event.target)) {
      this.props.onClear();
    }
  }

  handleDebouncedChange(searchTerm) {
    this.setState({
      searchTerm
    });

    this.props.onChange(searchTerm);
  }

  handleChange(event) {
    const { value } = event.target;
    const searchTerm = value.toLowerCase().trim();

    if (!value) {
      this.clearInput();
      return;
    }

    this.setState({
      focusedSuggestion: null,
      value
    });

    if (searchTerm) {
      this.handleDebouncedChange(searchTerm);
    }
  }

  handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        if (this.props.suggestions.length > 0) {
          event.preventDefault();
          this.setFocusedSuggestion(event.key === 'ArrowDown');
        }
        break;

      case 'Backspace':
        this.handleBackspace();
        break;

      case 'Enter':
        this.search();
        break;

      case 'Escape':
        this.handleEscape();
        break;
    }
  }

  handleBackspace() {
    this.setState({
      focusedSuggestion: null
    });
  }

  handleEscape() {
    this.setState({
      focusedSuggestion: null,
      searchTerm: ''
    });

    this.input.blur();
    this.props.onClear();
  }

  handleHover(current) {
    this.setState({
      focusedSuggestion: current
    });
  }

  handleSelection(suggestion) {
    this.setState({
      focusedSuggestion: null,
      value: suggestion
    });

    this.props.onClear();

    if (this.props.onSelection) {
      this.props.onSelection(suggestion);
    }
  }

  search() {
    this.props.onClear();
    this.props.onSearch(this.state.value.trim());
  }

  render() {

    const submitStyle = {
      background: 'transparent',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      border: '0',
      cursor: 'pointer',
      fontSize: '0',
      outline: '0',
      padding: '0',
      width: '25px',
      borderRadius: '25px',
      backgroundColor: '#e5e5e5',
      backgroundImage: 'url(./assets/icons/search.svg)',
      backgroundSize: '35%',
      border: '1px solid #ddd',
      padding: '0 20px',
      opacity: '0.8',
      width: '40px'
    }
    const cancelStyle = {
      background: 'transparent',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      border: '0',
      cursor: 'pointer',
      fontSize: '0',
      outline: '0',
      padding: '0',
      width: '25px',
      borderRadius: '25px',
      backgroundImage: 'url(./assets/icons/clear.svg)',
      backgroundSize: '30%',
      right: '0',
      width: '40px'
    }
    const { props, state } = this;


    return (
      <div ref={ref => (this.container = ref)}>
        <div className={classNames({
            field: true,
            fieldFocused : state.isFocused
          })}>
          <input
            placeholder='Search User'
            className="input"
            type="text"
            ref={ref => (this.input = ref)}
            value={state.value}
            onChange={this.handleChange}
            onFocus={this.toggleFocus}
            onBlur={this.toggleFocus}
            onKeyDown={this.props.suggestions && this.handleKeyDown}
          />
          {state.value && this.props.shouldRenderClearButton &&
            <button style={cancelStyle}
              className=""
              onClick={this.clearInput}
            />
          }
          {this.props.shouldRenderSearchButton &&
            <button style={submitStyle}
              className="submit-button"
              onClick={this.search}
            />
          }
        </div>
        {state.value && this.props.suggestions.length > 0 &&
          <Suggestions
            focusedSuggestion={state.focusedSuggestion}
            onSelection={this.handleSelection}
            onSuggestionHover={this.handleHover}
            searchTerm={state.searchTerm}
            suggestions={this.props.suggestions}
            suggestionRenderer={this.props.suggestionRenderer}
          />
        }
      </div>
    );
  }
}

export default SearchBar;
