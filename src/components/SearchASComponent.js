import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { fetchSuggestions } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    suggestions: state.suggestions
  }
}

const mapDispatchToProps = (dispatch) => ({
fetchSuggestions: (searchTerm) => dispatch(fetchSuggestions(searchTerm))
});



class SearchAS extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };
    this.getSuggestionValue=this.getSuggestionValue.bind(this);
    this.renderSuggestion=this.renderSuggestion.bind(this);
    this.onSuggestionSelected=this.onSuggestionSelected.bind(this);
  }

  onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }){
    if(this.props.location.pathname === '/addusers') {
      alert("already at /addusers");
    }
    else {
      this.props.history.push("/addusers");
    }
    // alert(this.props.location.pathname);
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
        inputProps={inputProps} 
        onSuggestionSelected={this.onSuggestionSelected}
        />
      </React.Fragment>
      
      
    );
  }
}
  
// export default SearchAS;  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchAS));
