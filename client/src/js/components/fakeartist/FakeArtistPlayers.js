import React from 'react'

const FakeArtistPlayers = ({game}) => {
  return (

    <table className="players">
      <thead><tr><th>Spelare</th></tr></thead>
      <tbody>
        {game.users.length > 0 &&
          game.users.map((user, i) => { return (
            <tr key={i}><td>{user.name}</td></tr>
          )})
        }
      </tbody>
    </table>

  )
}

export default FakeArtistPlayers;
