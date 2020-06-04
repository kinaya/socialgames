import React from 'react'
import { toggleCanvas } from '../../actions/fakeArtistActions'
import { connect } from 'react-redux'

const FakeArtistForm = ({toggleCanvas, canvasState}) => {

  return (
    <div className="form">

      <h2>Inställningar</h2>

      <input checked={canvasState} onChange={() => toggleCanvas(canvasState ? false : true)} type="checkbox" id="canvas" name="canvas" />
      <label htmlFor="canvas">Rita på skärmen</label>

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
