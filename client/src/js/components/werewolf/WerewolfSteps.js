import React, { useEffect } from 'react'

const WerewolfSteps = ({step, nextStep, displayCharacters, characters, userId, user}) => {

  let myCharacter = null
  for(let character of characters) {
    if(character.userId === userId) {
      myCharacter = character.character.name
    }
  }

  useEffect(() => {
    const videoMuted = user.videoMuted;
    const jitsuApi = user.jitsuApi;

    console.log('Mute status:', user.videoMuted)

    if(step.number === 2 && !videoMuted) {
      console.log('Video is not muted and step is 2 - mute video!')
      jitsuApi.executeCommand('toggleVideo')
    }
    if(step.number === 5 && videoMuted) {
      console.log('Video is muted and step is 5 - unmute video!')
      jitsuApi.executeCommand('toggleVideo')
    }
  }, [step.number])

  return (
    <div  className="ui info message">
      {step.number === 1 && (
        <>
          <p>Läs noga informationen om din roll och memorera den. När alla är färdiga klickar en av er på "Start natten". Rollkorten kommer då vändas upp och ner, och kameran stängas av för natten. Är du redo?</p>
          <button className="ui primary large button" onClick={nextStep}>Start natten</button>
        </>
      )}
      {step.number === 2 && (
        <>
          {myCharacter === 'Varulv' ? (
            <>
            <p>Det är du som är varulv! Titta om det finns någon mer. En av er klickar sedan på "Gå vidare"</p>
            <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
            </>
          ):(
            <p>Varulvarna vaknar och tittar på varandra. Du är inte varulv så du får inte titta.</p>
          )}
        </>
      )}
      {step.number === 3 && (
        <>
          {myCharacter === 'Siare' ? (
            <>
            <p>Siaren vaknar och tittar på en spelare kort, eller två av de oavnvända korten. Det är du som är siare! Titta på kort. Klicka på "Gå vidare" när du är färdig.</p>
            <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
            </>
          ):(
            <p>Siaren vaknar och tittar på en spelares kort, eller två kort i mitten. Du är inte siare, så du får inte göra någonting.</p>
          )}
        </>
      )}
      {step.number === 4 && (
        <>
          {myCharacter === 'Tjuv' ? (
            <>
            <p>Det är du som är tjuv! Titta på kort. Klicka på "Gå vidare" när du är färdig</p>
            <button className="ui primary large button" onClick={nextStep}>Gå vidare</button>
            </>
          ):(
            <p>Tjuven vaknar och byter kort med en annan spelare. Du är inte tjuv så du får inte göra någonting.</p>
          )}
        </>
      )}
      {step.number === 5 && (
        <>
          <p>Det är morgon och alla får se varandra. Nu ska ni lista ut vem eller vilka som är varulvar!</p>
          <button className="ui basic button" onClick={displayCharacters}>Visa alla karaktärer</button>
        </>
      )}
    </div>
  )
}

export default WerewolfSteps
