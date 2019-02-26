import React from 'react'

const FakeArtistGameWaiting = ({code}) => {

  return (
    <div className="ui text container center aligned">
      <h1>Väntar på spelare</h1>
      <div className="ui info message">
        <div className="code"><span>Spelkod:</span> {code}</div>
        <div className="link"><span>Link:</span> https://socialgamesapp.herokuapp.com/fake-artist/{code}</div>
      </div>
    </div>
  )
}

export default FakeArtistGameWaiting;
