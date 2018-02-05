import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';
import Search from './components/Search.jsx';
import Providers from './components/Providers.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { providers: {
      hulu: { loading: null, found: null }
    }}
  }

  search = (title) => {
    this.searchProvider('hulu', title);
  //   this.searchProvider('netflix', title);
  //   this.searchProvider('amazon', title);
  }

  searchProvider = (provider, title) => {
    this.setState({ providers: {
      [provider]: { loading: 'loading' }
    }});

    axios.get(`http://localhost:3000/search/${provider}/${title}`)
      .then(res => {
        const found = res.data ? 'found' : 'notFound';

        this.setState({ providers: {
          [provider]: { loading: null, found }
        }});
      });
  }

  render () {
    return (
      <div>
        <h1>Getflix</h1>
        <Search search={this.search}/>
        <Providers providers={this.state.providers}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
