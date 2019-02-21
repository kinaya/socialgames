import React from 'react'
import CreateGameForm from './CreateGameForm'

const CreateGame = () => {
  return (

    <div className="game fakeartist">
      <div className="container">

        <div className="intro">
          <h1>Create a new game</h1>
        </div>

        <CreateGameForm />

      </div>
    </div>

  )
}

export default CreateGame;
