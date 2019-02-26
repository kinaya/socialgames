import React from 'react'

const OtherWordsIntro = ({settings, setGameState, startGame, changeSettings}) => {

  return (
    <div className="ui text container">

      <div className="ui text container center aligned intro">
        <h1>Med andra ord</h1>
        <p>Ett familje- och partyspel som går ut på att du ska säga samma sak, med andra ord, under tidspress. Gör det svårare genom att ha med förbjudna ord som inte får användas i din förklaring!</p>
      </div>

      <div className="ui form">

        <h4 className="ui dividing header">Förbjudna ord</h4>

        <div className="field">
          <div className="ui checkbox">
            <input type="checkbox" id="forbidden" name="forbidden" onChange={() => changeSettings('forbidden', !settings.forbidden)} checked={settings.forbidden ? true : false} />
            <label htmlFor="forbidden">Spela med förbjudna ord</label>
          </div>
        </div>

        <h4 className="ui dividing header">Timer</h4>

        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" value="option1" checked={settings.timer === 0} onChange={() => changeSettings('timer', 0)} />
            <label>Ingen timer</label>
          </div>
        </div>

        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" value="option1" checked={settings.timer === 60} onChange={() => changeSettings('timer', 60)} />
            <label>60 sekunder</label>
          </div>
        </div>

        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" value="option1" checked={settings.timer === 30} onChange={() => changeSettings('timer', 30)} />
            <label>30 sekunder</label>
          </div>
        </div>

      </div>

      <button className="ui primary button" onClick={() => startGame()}>Starta spelet</button>

    </div>
  )
}

export default OtherWordsIntro;
