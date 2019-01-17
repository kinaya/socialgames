import React from 'react'
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg';

class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = {messages: []};
  }

  componentDidMount() {

    // This is an "echo" websocket
    //this.ws = new WebSocket(url);
    //const websocket = new WebSocket('ws://localhost:3000/fake-artist/echo');

    //this.ws.onopen = () => {
    // on connecting, do nothing but log it to the console
    //console.log('connected')
    //}

    // On receiving a message
    //this.ws.onmessage = evt => {
      //const message = JSON.parse(evt.data)
      //console.log(message)
      //this.setState({
        //messages : this.state.messages.concat([ evt.data ])
      //})
    //}

    // Send message every two seconds. The service sends it right back!
    //setInterval( _ =>{
    //   this.ws.send( Math.random() )
    // }, 2000 )

    //this.ws.onclose = () => {
    //console.log('disconnected')
    // automatically try to reconnect on connection loss
    //this.setState({
    //  wss: new WebSocket(URL),
    //})
    //}
  }

  render() {

    return (
      <div className="start">
        <div className="intro">
          <h1>Social games</h1>
          <p>Alla de bästa sociala spelen. Spela lättare tillsammans!</p>
        </div>

        <ul>{ this.state.messages.map( (msg, idx) => <li key={'msg-' + idx }>{ msg }</li> )}</ul>


        <div className="games">
          <Link to='/other-words'>
            <div className="inner">
              <ReactSVG src="./otherwords_logo.svg" />
              <h2>Med andra ord</h2>
              <p>Gissa ordet</p>
            </div>
          </Link>
          <Link to='/pictionary'>
            <div className="inner">
              <ReactSVG src='./pictionary_logo.svg' />
              <h2>Pictionary</h2>
              <p>Rita bäst</p>
            </div>
          </Link>
          <Link to='/fake-artist'>
            <div className="inner">
              <ReactSVG src='./fakeartist_logo.svg' />
              <h2>Fake artist</h2>
              <p>Vem luras?</p>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Start;
