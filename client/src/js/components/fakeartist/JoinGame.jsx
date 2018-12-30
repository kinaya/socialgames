import React from 'react'
import FakeArtistIntro from './FakeArtistIntro'

class JoinGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: '', code: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.fa_addRemoveUser('add', this.state.code, this.state.name, null);
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
            <input type="text" name="code" pattern="[A-Z1-9]{6}" value={this.state.code} onChange={this.handleChange} />
          </label>
          <label>
            Ditt namn: (bara bokstäver)
            <input type="text" name="name" required pattern="[A-Za-z]+" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Gå med" />
        </form>
      </div>
    )

  }
}

export default JoinGame;
