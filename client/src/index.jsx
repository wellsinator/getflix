import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.css';
import Search from './components/Search.jsx';
import Providers from './components/Providers.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  search = (title) => {
    console.log(title);
  }

  render () {
    return (
      <div>
        <h1>Getflix</h1>
        <Search search={this.search}/>
        <Providers/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
