import React from 'react'

const FakeArtistGameWaiting = ({code}) => {

  return (
    <div>
      <div className="intro">
        <h1>Väntar på spelare</h1>
        <div className="code"><span>Spelkod:</span> {code}</div>
      </div>

    </div>
  )
}

export default FakeArtistGameWaiting;
