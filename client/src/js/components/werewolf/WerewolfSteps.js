import React from 'react'

const WerewolfSteps = ({step, nextStep, displayCharacters}) => {
  return (
    <div  className="ui info message">
      {step === 0 && (
        <>
          <h3>1. Varulvarna vaknar</h3>
          <p>Varulvarna vaknar och tittar på varandra.</p>
        </>
      )}
      {step === 1 && (
        <>
          <h3>2. Siaren vaknar</h3>
          <p>Siaren vaknar och tittar på en spelares kort, eller två kort i mitten.</p>
        </>
      )}
      {step === 2 && (
        <>
          <h3>3. Tjuven vaknar</h3>
          <p>Tjuven vaknar och byter kort med en annan spelare.</p>
        </>
      )}
      {step === 3 && (
        <>
          <h3>4. Det är morgon - alla vaknar</h3>
          <p>Vilka är varulvarna?</p>
        </>
      )}
      {step !== 3 && (
        <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
      )}
      {step === 3 && (
        <button className="ui primary large button" onClick={displayCharacters}>Visa alla karaktärer</button>
      )}

    </div>
  )
}

export default WerewolfSteps
