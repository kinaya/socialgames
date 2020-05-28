import { TOGGLE_CANVAS, UPDATE_CANVAS, NEXT_TURN } from '../constants'

export const updateCanvas = (canvas) => (dispatch) => {
  dispatch({
    type: UPDATE_CANVAS,
    canvas: canvas
  })
}

export const nextTurn = () => dispatch => {
  dispatch({
    type: NEXT_TURN
  })
}

export const toggleCanvas = (boolean) => dispatch => {
  dispatch({
    type: TOGGLE_CANVAS,
    boolean: boolean
  })
}
