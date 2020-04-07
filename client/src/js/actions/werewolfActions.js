import { DISPLAY_CHARACTERS, NEXT_STEP } from '../constants'

export const displayCharacters = () => {
  return ({
    type: DISPLAY_CHARACTERS
  })
}

export const nextStep = () => {
  return ({
    type: NEXT_STEP
  })
}
