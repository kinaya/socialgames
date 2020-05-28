import React from 'react'
import { toggleCanvas } from '../../actions/fakeArtistActions'
import { connect } from 'react-redux'

const FakeArtistForm = ({toggleCanvas, canvasState}) => {

  return (
    <div className="form">

      <h2>Inställningar</h2>

      <h4>Online eller live</h4>

      <input checked={canvasState}  onChange={() => toggleCanvas(true)} type="radio" id="online" name="canvas" value="online" />
      <label htmlFor="online">Online</label>

      <input checked={!canvasState} onChange={() => toggleCanvas(false)} type="radio" id="live" name="canvas" value="live" />
      <label htmlFor="live">Live</label>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    canvasState: state.sharedState.game.canvasState
  }
}

export default connect(
  mapStateToProps,
  {toggleCanvas}
)(FakeArtistForm)
