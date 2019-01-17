import React from 'react'
import FakeArtistIntro from './FakeArtistIntro'

class JoinGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {userName: '', gameCode: ''};
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.fa_joinGame(this.state.userName, this.state.gameCode);
  }

  render() {

    return (
      <div>
        <div className="intro">
          <h1>Gå med i ett spel</h1>
        </div>

        <form onSubmit={this.handleSubmit}>
          <label>
            Spelkod:
            <input type="text" name="gameCode" pattern="[A-Z0-9]{6}" value={this.state.code} onChange={this.handleChange} />
          </label>
          <label>
            Ditt namn: (bara bokstäver)
            <input type="text" name="userName" required pattern="[A-Za-z]+" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Gå med" />
        </form>
      </div>
    )

  }
}

export default JoinGame;
