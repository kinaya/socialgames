import { TOGGLE_VIDEO, WS_CONNECT, WS_DISCONNECT, CHANGE_GAME, RESET_GAMES, START_GAME, DISPLAY_CHARACTERS, NEXT_STEP } from '../constants'
import * as actions from '../actions/websocketActions';
import { updateUsers, updateGame } from '../actions/gameActions';
import { updatePeers, addPeer } from '../actions/streamActions'
import io from "socket.io-client";
import Peer from "simple-peer";

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

        const peers = [];

        // The existing users gets sent to a newly joined user
        // "all users" in example
        // 'ecistingusers' is sent from server when a user connects
        socket.on('existingusers', (data) => {

          const userStream = store.getState().user.stream;

          // Create peer for all users if not already existing
          data.users.forEach(user => {
            if(user.socketid !== socket.id) { // Not current id!
              const peer = new Peer ({
                initiator: true,
                trickle: false,
                stream: userStream,
              })
              // This gets triggered by the newly created user bc we set initiator to true
              // The signal is the "offer"
              peer.on("signal", signal => {
                console.log("signal", signal)
                const userToSignal = user.socketid
                const callerID = socket.id
                const stream = userStream
                socket.emit("sendingsignal", {userToSignal, callerID, signal})
              })
              peers.push(peer)
            }
          })
          store.dispatch(updatePeers(peers))
        })

        // when a new user joins the game
        socket.on('userjoined', (data) => {
          const userStream = store.getState().user.stream;
          const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: userStream
          })
          // This is run when the neewly added user accepts
          peer.on("signal", signal => {
            const callerID = data.callerID;
            socket.emit("returningsignal", {signal, callerID})
          })
          peer.signal(data.signal) // "action.payload"
          store.dispatch(addPeer(peer));
        })

        socket.on('receivingreturnedsignal', data => {
          console.log('receivingreturnedsignal', data)
          console.log('peers', peers)
          //const item = peers.find(p => p.peerID === data.id);
          //item.peer.signal(data.signal)
        })

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
        console.log('TOOGLE_VIDEO boolean:', action.boolean)
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
