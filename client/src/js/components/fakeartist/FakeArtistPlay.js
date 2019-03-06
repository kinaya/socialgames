import React from 'react'

const FakeArtistGamePlay = ({userId, users, word}) => {

  // Get the Fake User
  let amIFake = false;
  const fakeUser = users.find(function(user) {
    return user.fakeartist == true;
  })
  // The game state might update before the users state, so check if a fakeUser was found
  if(fakeUser && fakeUser.userId === userId) {
    amIFake = true;
  }

  return (
    <div className="ui text container center aligned">

      <div className="ui info message">

        {amIFake ?
          <h2 className="ui header">Du <span className="italic">är</span> fake artist!</h2>
        :
          <h2 className="ui header">Du <span className="italic">är inte</span> fake artist!</h2>
        }

        <div><span>Kategori:</span> {word.category}</div>
        <div><span>Ord:</span> {amIFake ? '?' : word.word}</div>
      </div>

    </div>
  )
}

export default FakeArtistGamePlay;
