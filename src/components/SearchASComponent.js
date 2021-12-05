import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
  
class SearchAS extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };
    this.getSuggestionValue=this.getSuggestionValue.bind(this);
    this.renderSuggestion=this.renderSuggestion.bind(this);
  }


  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.fetchSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  // bug here, initially there is true value which tries to fetch true as search term
  getSuggestionValue= (suggestion) => {
    return suggestion.username;
  }

  renderSuggestion= (suggestion, { query }) => {
    const suggestionText = suggestion.username;
    const matches = match(suggestionText, query);
    const parts = parse(suggestionText, matches);
  
    return (
        <span className="suggestion-content">
          <span className="name">
            {
              parts.map((part, index) => {
                const className = part.highlight ? 'highlight' : null;
    
                return (
                  <span className={className} key={index}>{part.text}</span>
                );
              })
            }
          </span>
        </span>      
      
    );
  }


  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search User",
      value,
      onChange: this.onChange
    };


    return (
      <React.Fragment>
          <Autosuggest 
        suggestions={this.props.suggestions.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps} />
      </React.Fragment>
      
      
    );
  }
}
  
export default SearchAS;  
