import React from 'react'

const FakeArtistGamePlay = ({userId, game}) => {

  // Get the Fake User
  let amIFake = false;
  const fakeUser = game.users.find(function(user) {
    return user.fakeArtist == true;
  })
  // The game state might update before the users state, so check if a fakeUser was found
  if(fakeUser && fakeUser._id === userId) {
    amIFake = true;
  }

  return (
    <div>
      <div className="intro">

        {amIFake ?
          <h1>Du <span className="italic">är</span> fake artist!</h1>
        :
          <h1>Du <span className="italic">är inte</span> fake artist!</h1>
        }

      </div>

      <div className="words">
        <div><span className="label">Kategori:</span><span className="word">{game.word.category}</span></div>
        <div><span className="label">Ord:</span><span className="word">{amIFake ? '?' : game.word.word}</span></div>
      </div>

    </div>
  )
}

export default FakeArtistGamePlay;
