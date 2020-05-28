import { TOGGLE_CANVAS, NEXT_TURN, UPDATE_CANVAS, SWITCH_CHARACTERS, TOGGLE_VIDEO, WS_CONNECT, WS_DISCONNECT, CHANGE_GAME, RESET_GAMES, START_GAME, DISPLAY_CHARACTERS, NEXT_STEP } from '../constants'
import * as actions from '../actions/websocketActions';
import { updateUsers, updateGame } from '../actions/gameActions';
import io from "socket.io-client";

const socketMiddleware = () => {

  let socket = null;

  return store => next => action => {

    switch (action.type) {

      case WS_CONNECT:
        if (socket !== null) { socket.close(); }
        socket = io(action.host, action.query)

        socket.on('game', (data) => {
          if(data.game) { store.dispatch(updateGame(data.game))}
          if(data.users) { store.dispatch(updateUsers(data.users)) }
          if(data.error) { toast.error(data.error)}
        })

        break;

      case WS_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;

      case TOGGLE_VIDEO:
        socket.emit('toggleVideo', action.boolean)
        break;

      case CHANGE_GAME:
        socket.emit('changeGame', action.gameName)
        break;

      case RESET_GAMES:
        socket.emit('resetGames')
        break;

      case START_GAME:
        socket.emit('startGame', action.gameName)
        break;

      case SWITCH_CHARACTERS:
        socket.emit('switchCharacters', action.one, action.two)
        break;

      case NEXT_STEP:
        socket.emit('nextStep')
        break;
s
      case DISPLAY_CHARACTERS:
        socket.emit('displayCharacters')
        break;

      case UPDATE_CANVAS:
        socket.emit('updateCanvas', action.canvas)
        break;

      case NEXT_TURN:
        socket.emit('nextTurn')
        break;

      case TOGGLE_CANVAS:
        socket.emit('toggleCanvas', action.boolean)
        break;

      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
