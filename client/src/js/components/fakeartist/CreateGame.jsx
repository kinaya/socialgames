import React from 'react'

class CreateGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.fa_createGame(this.state.name);
  }

  render() {

    return (
      <div>
        <div className="intro">
          <h1>Starta nytt spel</h1>
        </div>

        <form onSubmit={this.handleSubmit}>
          <label>
            Ditt namn:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Skapa spel" />
        </form>
      </div>
    )

  }
}

export default CreateGame;
