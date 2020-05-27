import React, {useState, useEffect, useRef} from 'react'
import CanvasDraw from 'react-canvas-draw';
import { connect } from 'react-redux'
import { updateCanvas, nextTurn } from '../../actions/fakeArtistActions'

const FakeArtistGamePlay = ({user, word, users, category, fakeArtist, currentPlayer, canvas, updateCanvas, nextTurn}) => {
  const [amIFake, setAmIFake] = useState(false)
  const [brushColor, setBrushColor] = useState('#333333')

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

  const changeColor = (color) => {
    setBrushColor(color)
  }

  return (
    <div>

      <div className={`canvas ${currentPlayer != user.user.userId && 'disabled'}`}>
        <CanvasDraw ref={refCanvas} disabled={currentPlayer === user.user.userId ? false : true} immediateLoading={true} saveData={canvas} onChange={() => draw()} brushColor={brushColor} brushRadius={2} hideGrid={true} canvasHeight='600px' canvasWidth='100%'/>
        <div className="canvas-settings">
          <div className="color-palette">
            <span className={`black ${brushColor === '#333333' ? 'active' : 'non-active'}`} onClick={() => changeColor('#333333')}></span>
            <span className={`red ${brushColor === '#FF0000' ? 'active' : 'non-active'}`}  onClick={() => changeColor('#FF0000')}></span>
            <span className={`yellow ${brushColor === '#FFFF00' ? 'active' : 'non-active'}`}  onClick={() => changeColor('#FFFF00')}></span>
            <span className={`green ${brushColor === '#008000' ? 'active' : 'non-active'}`}  onClick={() => changeColor('#008000')}></span>
            <span className={`blue ${brushColor === '#0000FF' ? 'active' : 'non-active'}`}  onClick={() => changeColor('#0000FF')}></span>
            <span className={`purple ${brushColor === '#800080' ? 'active' : 'non-active'}`}  onClick={() => changeColor('#800080')}></span>
          </div>
        </div>
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
