import React, { useEffect } from 'react'

const WerewolfSteps = ({step, nextStep, displayCharacters, characters, userId}) => {

  let myCharacter = null
  for(let character of characters) {
    if(character.userId === userId) {
      myCharacter = character.character.name
    }
  }

  return (
    <div  className="ui info message">
      {step.number === 0 && (
        <>
          <h3>1. Varulvarna vaknar</h3>
          <p>Varulvarna vaknar och tittar på varandra.</p>
          {myCharacter === 'Varulv' && (
            <>
            <p>Det är du som är varulv! Titta om det finns någon mer. En av er klickar sedan på "Gå vidare"</p>
            <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
            </>
          )}
        </>
      )}
      {step.number === 1 && (
        <>
          <h3>2. Siaren vaknar</h3>
          <p>Siaren vaknar och tittar på en spelares kort, eller två kort i mitten.</p>
          {myCharacter === 'Siare' && (
            <>
            <p>Det är du som är siare! Titta på kort. Klicka på "Gå vidare" när du är färdig.</p>
            <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
            </>
          )}
        </>
      )}
      {step.number === 2 && (
        <>
          <h3>3. Tjuven vaknar</h3>
          <p>Tjuven vaknar och byter kort med en annan spelare.</p>
          {myCharacter === 'Tjuv' && (
            <>
            <p>Det är du som är tjuv! Titta på kort. Klicka på "Gå vidare" när du är färdig</p>
            <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
            </>
          )}
        </>
      )}
      {step.number === 3 && (
        <>
          <h3>4. Det är morgon - alla vaknar</h3>
          <p>Vilka är varulvarna?</p>
          <button className="ui basic button" onClick={displayCharacters}>Visa alla karaktärer</button>
        </>
      )}
    </div>
  )
}

export default WerewolfSteps
