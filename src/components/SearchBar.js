import React, { Component } from 'react';

class SearchBar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <form>
            <input type="text" placeholder="Search" onChange={this.props.handleSearch}/>
        </form>
    );
  }
}

export default SearchBar;
