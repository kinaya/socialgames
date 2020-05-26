import React, { useEffect } from 'react'

const WerewolfSteps = ({step, nextStep, displayCharacters, toggleCurtain, characters, userId, user}) => {

  let myCharacter = null
  for(let character of characters) {
    if(character.userId === userId) {
      myCharacter = character.character.name
    }
  }

  useEffect(() => {
    const videoMuted = user.videoMuted;
    const jitsuApi = user.jitsuApi;

    if(jitsuApi) {
      // Close curtain
      if(step.number === 2 && !user.curtain) {
        toggleCurtain(true);
      }
      // Open curtain
      if(step.number === 5 && user.curtain) {
        toggleCurtain(false)
      }

/*      if(step.number === 2 && !videoMuted && myCharacter != 'Varulv') {
        const iframe = jitsuApi.getIFrame();
        console.log(iframe);
        iframe.insertBefore(document.createElement('div'));
        jitsuApi.executeCommand('toggleVideo')
      }

      // Turn off camera for all who has it on (ie werewolfs)
      if(step.number === 3 && !videoMuted) {
        jitsuApi.executeCommand('toggleVideo')
      }

      // Turn everybodys camera back on
      if(step.number === 5 && videoMuted) {
        jitsuApi.executeCommand('toggleVideo')
      }*/

    }

  }, [step.number])

  return (
    <div className="ui info message">

      {step.number === 1 && (
        <>
          <h3>Rollerna slumpas</h3>
          <p>Läs noga informationen om din roll och memorera den. När alla är färdiga klickar en av er på "Start natten". Rollkorten kommer då vändas upp och ner, och kameran stängas av för natten. Är du redo?</p>
          <button className="ui primary large button" onClick={nextStep}>Starta natten</button>
        </>
      )}
      {step.number === 2 && (
        <>
          <h3>Varulvarna vaknar</h3>
          {myCharacter === 'Varulv' ? (
            <>
            <p>Det är du som är varulv! Titta om det finns någon mer varulv bland er. En av er klickar sedan på "Gå vidare"</p>
            <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
            </>
          ):(
            <p>Varulvarna vaknar och tittar på varandra. Du är inte varulv så du får inte titta.</p>
          )}
        </>
      )}
      {step.number === 3 && (
        <>
          <h3>Siaren vaknar</h3>
          {myCharacter === 'Siare' ? (
            <>
            <p>Siaren vaknar och tittar på en annan spelares kort, eller två av de oavnvända korten. Det är du som är siare! Titta på kort. Klicka på "Gå vidare" när du är färdig.</p>
            <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
            </>
          ):(
            <p>Siaren vaknar och tittar på en spelares kort, eller två av de oanvända korten. Du är inte siare, så du får inte göra någonting.</p>
          )}
        </>
      )}
      {step.number === 4 && (
        <>
          <h3>Tjuven vaknar</h3>
          {myCharacter === 'Tjuv' ? (
            <>
            <p>Det är du som är tjuv! Byt kort med en annan spelare genom att klicka på det. Klicka på "Gå vidare" när du är färdig</p>
            <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
            </>
          ):(
            <p>Tjuven vaknar och byter kort med en annan spelare. Du är inte tjuv så du får inte göra någonting.</p>
          )}
        </>
      )}
      {step.number === 5 && (
        <>
          <h3>Morgon - alla vaknar</h3>
          <p>Det är morgon och alla får se varandra. Nu ska ni lista ut vem eller vilka som är varulvar!</p>
          <button className="ui basic button" onClick={displayCharacters}>Visa alla karaktärer</button>
        </>
      )}
    </div>
  )
}

export default WerewolfSteps
