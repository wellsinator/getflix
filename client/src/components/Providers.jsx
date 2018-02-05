import React from 'react';

class Providers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { netflix, hulu, amazon } = this.props.providers;

    return (
      <div>
        <img className={`${netflix.loading} ${netflix.found}`} src="https://i.imgur.com/jYCdI9h.jpg"/>
        <img className={`${hulu.loading} ${hulu.found}`} src="https://i.imgur.com/uae3pux.jpg"/>
        <img className={`${amazon.loading} ${amazon.found}`} src="https://i.imgur.com/zj0SXAK.jpg"/>
      </div>
    ) 
  }
}

export default Providers;
