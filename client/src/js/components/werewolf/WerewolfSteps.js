import React, { useEffect } from 'react'

const WerewolfSteps = ({step, nextStep, displayCharacters, characters, userId, toggleLocalVideo}) => {

  let myCharacter = null
  for(let character of characters) {
    if(character.userId === userId) {
      myCharacter = character.character.name
    }
  }

  useEffect(() => {
    console.log('UseEffect in steps!')
    console.log(step.number)
    if(step.number === 2) {
      toggleLocalVideo(false)
    }
    if(step.number === 5) {
      toggleLocalVideo(true)
    }
  }, [step.number])

  return (
    <div>

      <div className="breadcrumb">
        <div className={`${step.number === 1 ? 'active' : 'non-active'}`}>1. Rollerna slumpas</div>
        <div className={`${step.number === 2 ? 'active' : 'non-active'}`}>2. Varulvarna vaknar</div>
        <div className={`${step.number === 3 ? 'active' : 'non-active'}`}>3. Siaren vaknar</div>
        <div className={`${step.number === 4 ? 'active' : 'non-active'}`}>4. Tjuven vaknar</div>
        <div className={`${step.number === 5 ? 'active' : 'non-active'}`}>5. Morgon - alla vaknar</div>
      </div>

    <div  className="ui info message">
      {step.number === 1 && (
        <>
          <h3>1. Rollerna slumpas</h3>
          <p>Här är alla rollerna! Läs noga vad som gäller för din roll. När du är redo att starta natten klickar du på "Starta natten"</p>
          <button className="ui primary large button" onClick={nextStep}>Start natten</button>
        </>
      )}
      {step.number === 2 && (
        <>
          <h3>2. Varulvarna vaknar</h3>
          <p>Varulvarna vaknar och tittar på varandra. Du är inte varulv så du får inte titta.</p>
          {myCharacter === 'Varulv' && (
            <>
            <p>Det är du som är varulv! Titta om det finns någon mer. En av er klickar sedan på "Gå vidare"</p>
            <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
            </>
          )}
        </>
      )}
      {step.number === 3 && (
        <>
          <h3>3. Siaren vaknar</h3>
          <p>Siaren vaknar och tittar på en spelares kort, eller två kort i mitten. Du är inte siare, så du får inte göra någonting.</p>
          {myCharacter === 'Siare' && (
            <>
            <p>Det är du som är siare! Titta på kort. Klicka på "Gå vidare" när du är färdig.</p>
            <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
            </>
          )}
        </>
      )}
      {step.number === 4 && (
        <>
          <h3>4. Tjuven vaknar</h3>
          <p>Tjuven vaknar och byter kort med en annan spelare. Du är inte tjuv så du får inte göra någonting.</p>
          {myCharacter === 'Tjuv' && (
            <>
            <p>Det är du som är tjuv! Titta på kort. Klicka på "Gå vidare" när du är färdig</p>
            <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
            </>
          )}
        </>
      )}
      {step.number === 5 && (
        <>
          <h3>5. Det är morgon - alla vaknar</h3>
          <p>Vilka är varulvarna?</p>
          <button className="ui basic button" onClick={displayCharacters}>Visa alla karaktärer</button>
        </>
      )}
    </div>
    </div>
  )
}

export default WerewolfSteps
