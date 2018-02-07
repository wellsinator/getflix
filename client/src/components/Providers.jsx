import React from 'react';

class Providers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { netflix, hulu, amazon, itunes, youtube, googlePlay } = this.props.providers;

    return (
      <div>
        <img className={`${netflix.loading} ${netflix.found}`} src="https://i.imgur.com/jYCdI9h.jpg"/>
        <img className={`${hulu.loading} ${hulu.found}`} src="https://i.imgur.com/uae3pux.jpg"/>
        <img className={`${amazon.loading} ${amazon.found}`} src="https://i.imgur.com/zj0SXAK.jpg"/>
        <img className={`${itunes.loading} ${itunes.found}`} src="https://i.imgur.com/55nfj1T.png"/>
        <img className={`${youtube.loading} ${youtube.found}`} src="https://i.imgur.com/tH7Ng79.png"/>
        <img className={`${googlePlay.loading} ${googlePlay.found}`} src="https://i.imgur.com/D6Vcejk.png"/>
      </div>
    ) 
  }
}

export default Providers;
