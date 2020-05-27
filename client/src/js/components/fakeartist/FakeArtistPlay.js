import React, {useState, useEffect, useRef} from 'react'
import CanvasDraw from 'react-canvas-draw';
import { connect } from 'react-redux'
import { updateCanvas, nextTurn } from '../../actions/fakeArtistActions'

const FakeArtistGamePlay = ({user, word, users, category, fakeArtist, currentPlayer, canvas, updateCanvas, nextTurn}) => {
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
    <div>

      <div className={`canvas ${currentPlayer != user.user.userId && 'disabled'}`}>
        <CanvasDraw ref={refCanvas} disabled={currentPlayer === user.user.userId ? false : true} immediateLoading={true} saveData={canvas} onChange={() => draw()} brushRadius={2} hideGrid={true} canvasHeight='600px' canvasWidth='100%'/>
      </div>

      <div className="message center">
        <h2>Du <span className="italic">{amIFake ? 'är' : 'är inte'}</span> fake artist!</h2>
        <div><span>Kategori:</span> {category}</div>
        <div><span>Ord:</span> {amIFake ? '?' : word}</div>

        <div className="players">
          {users.map(player => (
            <div key={player.userId} className={`${player.userId === currentPlayer && 'current-player'}`}>
              <span>{player.userName}</span>
              {player.userId === currentPlayer && user.user.userId === currentPlayer && <button onClick={() => nextTurn()}>Klar!</button>}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    fakeArtist: state.game.game.fakeArtist.fakeArtist,
    canvas: state.game.game.fakeArtist.canvas,
    currentPlayer: state.game.game.fakeArtist.currentPlayer,
    category: state.game.game.fakeArtist.category,
    word: state.game.game.fakeArtist.word,
    users: state.game.users,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {updateCanvas, nextTurn}
)(FakeArtistGamePlay)
