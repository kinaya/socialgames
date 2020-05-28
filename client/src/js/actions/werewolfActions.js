import { DISPLAY_CHARACTERS, NEXT_STEP, SWITCH_CHARACTERS } from '../constants'

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

export const switchCharacters = (one, two) => {
  return ({
    type: SWITCH_CHARACTERS,
    one: one,
    two: two
  })
}
