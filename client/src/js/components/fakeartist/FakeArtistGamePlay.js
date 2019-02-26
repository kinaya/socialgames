import React from 'react'

const FakeArtistGamePlay = ({userId, users, word}) => {

  // Get the Fake User
  let amIFake = false;
  const fakeUser = users.find(function(user) {
    return user.fakeArtist == true;
  })
  // The game state might update before the users state, so check if a fakeUser was found
  if(fakeUser && fakeUser._id === userId) {
    amIFake = true;
  }

  return (
    <div className="ui text container center aligned">

        {amIFake ?
          <h1 className="ui header">Du <span className="italic">är</span> fake artist!</h1>
        :
          <h1 classNAme="ui header">Du <span className="italic">är inte</span> fake artist!</h1>
        }

      <div className="ui info message">
        <div><span>Kategori:</span> {word.category}</div>
        <div><span>Ord:</span> {amIFake ? '?' : word.word}</div>
      </div>

    </div>
  )
}

export default FakeArtistGamePlay;
