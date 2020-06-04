import React, {useState, useEffect, useRef} from 'react'
import CanvasDraw from 'react-canvas-draw';
import { connect } from 'react-redux'
import { updateCanvas, nextTurn } from '../../actions/fakeArtistActions'

const FakeArtistGamePlay = ({user, word, users, category, fakeArtist, currentPlayer, canvasState, canvas, updateCanvas, nextTurn}) => {
  const [amIFake, setAmIFake] = useState(false)

  const refCanvas = useRef(null);

  useEffect(() => {
    if(fakeArtist === user.user.userId) {
      setAmIFake(true)
    }
  }, [])

  useEffect(() => {
    if(canvas) {
      refCanvas.current.loadSaveData(canvas)
    }
  }, [canvas])

  const draw = () => {
    if(!refCanvas.current.props.disabled) {
      updateCanvas(refCanvas.current.getSaveData())
    }
  }

  return (
    <>
      {canvasState && (
        <div className="container">
          <div className={`canvas ${currentPlayer != user.user.userId && 'disabled'}`}>

            <CanvasDraw
              ref={refCanvas}
              disabled={currentPlayer === user.user.userId ? false : true}
              immediateLoading={true}
              saveData={canvas}
              onChange={() => draw()}
              brushColor={user.user.color}
              brushRadius={2}
              hideGrid={true}
              canvasHeight='600px'
              canvasWidth='100%'
            />

            <div className="canvas-settings">
              <div className="canvas-players">
                {users.map(player => (
                  <div key={player.userId} className={`${player.color} ${player.userId === currentPlayer ? 'current-player' : 'not-current-player'}`}>
                    <span>{player.userName}</span>
                  </div>
                ))}
              </div>
              {user.user.userId === currentPlayer && (
                <button onClick={() => nextTurn()}>Klar!</button>
              )}
            </div>

          </div>
        </div>
      )}

      <div className="container">
        <div className="message center">
          <h2>Du <span className="italic">{amIFake ? 'är' : 'är inte'}</span> fake artist!</h2>
          <div><span>Kategori:</span> {category}</div>
          <div><span>Ord:</span> {amIFake ? '?' : word}</div>
        </div>
      </div>

    </>
  )
}

const mapStateToProps = state => {
  return {
    fakeArtist: state.sharedState.game.fakeArtist.fakeArtist,
    canvas: state.sharedState.game.fakeArtist.canvas,
    canvasState: state.sharedState.game.canvasState,
    currentPlayer: state.sharedState.game.fakeArtist.currentPlayer,
    category: state.sharedState.game.fakeArtist.category,
    word: state.sharedState.game.fakeArtist.word,
    users: state.sharedState.users,
    user: state.localState.user
  }
}

export default connect(
  mapStateToProps,
  {updateCanvas, nextTurn}
)(FakeArtistGamePlay)
