import React from 'react';

class Providers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { netflix, hulu } = this.props.providers;
    const netflixClasses = `${netflix.loading} ${netflix.found}`;
    const huluClasses = `${hulu.loading} ${hulu.found}`;

    return (
      <div>
        <img className={netflixClasses} src="https://i.imgur.com/jYCdI9h.jpg"/>
        <img className={huluClasses} src="https://i.imgur.com/uae3pux.jpg"/>
        {/* <img src="https://i.imgur.com/zj0SXAK.jpg"/> */}
      </div>
    ) 
  }
}

export default Providers;
