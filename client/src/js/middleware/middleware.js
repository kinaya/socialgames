import { TOGGLE_VIDEO, WS_CONNECT, WS_DISCONNECT, CHANGE_GAME, RESET_GAMES, START_GAME, DISPLAY_CHARACTERS, NEXT_STEP } from '../constants'
import * as actions from '../actions/websocketActions';
import { updateUsers, updateGame } from '../actions/gameActions';
import io from "socket.io-client";

const socketMiddleware = () => {

  let socket = null;

// const onOpen = store => (event) => {};
// const onClose = store => () => {};

/*  const onMessage = store => (event) => {
    const payload = JSON.parse(event.data);
    console.log('receiving server message');
    switch (payload.type) {
      case 'update_game_players':
        //store.dispatch(updateGame(payload.game, payload.current_player));
        break;
      default:
        break;
    }
  };*/



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

        // socket.onmessage = onMessage(store);
        // socket.onclose = onClose(store);
        // socket.onopen = onOpen(store);
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

      case NEXT_STEP:
        socket.emit('nextStep')
        break;

      case DISPLAY_CHARACTERS:
        socket.emit('displayCharacters')
        break;

      // case 'NEW_MESSAGE':
      //  socket.send(JSON.stringify({ command: 'NEW_MESSAGE', message: action.msg }));
      //  break;

      default:
        //console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware();
