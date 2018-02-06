import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';
import Search from './components/Search.jsx';
import Providers from './components/Providers.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      netflix: { loading: null, found: null },
      hulu: { loading: null, found: null },
      amazon: { loading: null, found: null },
      itunes: { loading: null, found: null },
    }
  }

  search = (title) => {
    this.setState({
      // netflix: { loading: 'loading' },
      hulu: { loading: 'loading' },
      // amazon: { loading: 'loading' },
      itunes: { loading: 'loading' },
    });

    // this.searchProvider('netflix', title);
    this.searchProvider('hulu', title);
    // this.searchProvider('amazon', title);
    this.searchProvider('itunes', title);
  }

  searchProvider = (provider, title) => {
    axios.get(`http://localhost:3000/search/${provider}/${title}`)
      .then(res => {
        const found = res.data ? 'found' : 'notFound';

        this.setState({ [provider]: { loading: null, found } });
      })
      .catch(err => {
        this.setState({ [provider]: { loading: null, found: 'error' } });
      });
  }

  render () {
    return (
      <div>
        <h1>Getflix</h1>
        <Search search={this.search}/>
        <Providers providers={this.state}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
