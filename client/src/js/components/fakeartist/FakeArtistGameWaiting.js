import React from 'react'

const FakeArtistGameWaiting = ({code}) => {

  return (
    <div>
      <div className="intro">
        <h1>Väntar på spelare</h1>
        <div className="code"><span>Spelkod:</span> {code}</div>
        <div className="link"><span>Link:</span> https://socialgamesapp.herokuapp.com/fake-artist/{code}</div>
      </div>
    </div>
  )
}

export default FakeArtistGameWaiting;
