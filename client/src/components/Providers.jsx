import React from 'react';

class Providers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hulu } = this.props.providers;
    const huluClasses = `${hulu.loading} ${hulu.found}`;

    return (
      <div>
        {/* <img src="https://i.imgur.com/jYCdI9h.jpg"/> */}
        <img className={huluClasses} src="https://i.imgur.com/uae3pux.jpg"/>
        {/* <img src="https://i.imgur.com/zj0SXAK.jpg"/> */}
      </div>
    ) 
  }
}

export default Providers;
