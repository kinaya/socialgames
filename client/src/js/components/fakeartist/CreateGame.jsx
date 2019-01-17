import React from 'react'

class CreateGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {userName: ''}
  }

  handleChange = (event) => {
    this.setState({userName: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.fa_createGame(this.state.userName)
  }

  render() {

    return (
      <div>
        <div className="intro">
          <h1>Starta nytt spel</h1>
        </div>

        <form onSubmit={this.handleSubmit}>
          <label>
            Ditt namn: (Bara bokstäver)
            <input type="text" name="name" required pattern="[A-Za-z]+" value={this.state.userName} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Skapa spel" />
        </form>
      </div>
    )

  }
}

export default CreateGame;
