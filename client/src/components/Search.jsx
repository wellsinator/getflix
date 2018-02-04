import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange = (e) => {
    this.setState({
      term: e.target.value
    });
  }

  search = () => {
    this.props.search(this.state.term);
  }

  render() {
    return (
      <div>
        Enter a movie/tv show title:
        <input value={this.state.term} onChange={this.onChange}/>       
        <button onClick={this.search}>Search</button>
      </div>
    ) 
  }
}

export default Search;
