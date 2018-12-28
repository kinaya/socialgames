import React from 'react'

const OtherWordsIntro = ({settings, setGameState, startGame, changeSettings}) => {

  return (
    <div>
      <div className="intro">
        <h1>Med andra ord</h1>
        <p>Ett familje- och partyspel som går ut på att du ska säga samma sak, med andra ord, under tidspress. Gör det svårare genom att ha med förbjudna ord som inte får användas i din förklaring!</p>
      </div>

      <div className="settings">

        <div className="checkbox setting">
          <h3>Förbjudna ord</h3>
          <input type="checkbox" id="forbidden" name="forbidden" onChange={() => changeSettings('forbidden', !settings.forbidden)} checked={settings.forbidden ? true : false} />
          <label htmlFor="forbidden">Spela med förbjudna ord</label>
        </div>

        <div className="radio setting">
          <h3>Timer</h3>
          <label>
            <input type="radio" value="option1" checked={settings.timer === 0} onChange={() => changeSettings('timer', 0)} />Ingen timer
          </label>

          <label>
            <input type="radio" value="option1" checked={settings.timer === 5} onChange={() => changeSettings('timer', 5)} />5 sekunder
          </label>

          <label>
            <input type="radio" value="option1" checked={settings.timer === 30} onChange={() => changeSettings('timer', 30)} />30 sekunder
          </label>

        </div>

      </div>

      <div className="startGame" onClick={() => startGame()}>Starta spelet</div>

    </div>
  )
}

export default OtherWordsIntro;
