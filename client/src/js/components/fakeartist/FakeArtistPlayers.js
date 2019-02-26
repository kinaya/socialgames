import React from 'react'

const FakeArtistPlayers = ({users}) => {
  return (
    <div className="ui container left aligned">
      <h4 className="ui top attached block header">Spelare</h4>
      {users.length > 0 &&
        users.map((user, i) => { return (
          <div key={i} className="ui attached segment">{user.name}</div>
        )})
      }
    </div>
  )
}

export default FakeArtistPlayers;
