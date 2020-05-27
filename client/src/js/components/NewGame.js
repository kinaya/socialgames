import React from 'react'
import NewGameForm from './NewGameForm'

const NewGame = () => {
  return (
    <div className="container">
      <h1>Skapa nytt spelrum</h1>
      <div className="container-inner">
        <NewGameForm />
      </div>
    </div>
  )
}

export default NewGame
