import React from 'react';
import autoBind from 'react-autobind';

import SearchBar from './searchs/search-bar';
import words from './words.json';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: []
    };

    autoBind(this, 'handleChange', 'handleClear', 'handleSelection');
  }

  handleClear() {
    this.setState({
      suggestions: []
    });
  }

  handleChange(input) {
    this.setState({
      suggestions: words.filter(word => word.startsWith(input))
    });
  }

  handleSelection(value) {
    if (value) {
      console.info(`Selected "${value}"`);
    }
  }

  handleSearch(value) {
    if (value) {
      console.info(`Searching "${value}"`);
    }
  }

  suggestionRenderer(suggestion, searchTerm) {
    return (
      <span>
        <span>{searchTerm}</span>
        <strong>{suggestion.substr(searchTerm.length)}</strong>
      </span>
    );
  }

  render() {
    return (
      <SearchBar
        placeholder="Search Username"
        onChange={this.handleChange}
        onClear={this.handleClear}
        onSelection={this.handleSelection}
        onSearch={this.handleSearch}
        shouldRenderClearButton={true}
        shouldRenderSearchButton={true}
        suggestions={this.state.suggestions}
        suggestionRenderer={this.suggestionRenderer}
      />
    );
  }
}

export default Search;

// import { useHistory } from 'react-router-dom';

// const SearchBar = ({ searchQuery, setSearchQuery }) => {
//     const history = useHistory();
//     const onSubmit = (e) => {
//         history.push(`?s=${searchQuery}`);
//         e.preventDefault();
//     };

//     return (
//         <form
//             action="/"
//             method="get"
//             autoComplete="off"
//             onSubmit={onSubmit}
//         >
//             <label htmlFor="header-search">
//                 <span className="visually-hidden">
//                     Search Users
//                 </span>
//             </label>
//             <input
//                 value={searchQuery}
//                 onInput={(e) => setSearchQuery(e.target.value)}
//                 type="text"
//                 id="header-search"
//                 placeholder="Search Users"
//                 name="s"
//             />
//             <button type="submit">Search</button>
//         </form>
//     );
// };

// export default SearchBar;