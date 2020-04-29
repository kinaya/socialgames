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

        // The new users get a list of all existing users from the server
        // This users has no peers when this runs!
        /*socket.on('existingusers', (users) => {
          // All the existing users including the newly joined one
          // user.socketid, users.userName, user.userId, user.gameCode
          const userStream = store.getState().user.stream;

          const peers = [];

          const callerUser = users.find(user => user.socketid === socket.id)
          const callerName = callerUser.userName;

          // Create peer for all users
          users.forEach(user => {
            if(user.socketid !== socket.id) {
              const peer = new Peer ({
                initiator: true,
                trickle: false,
                stream: userStream,
              })
              // If initiator set to true, emidiatly after construction a signal is sent out called "signal"
              // This gets triggered by the newly created user bc we set initiator to true
              // The signal is the "offer"
              // This will signal the other user that already was joined
              // IS THIS RUN ON THE NEWLY ADDED??
              // The signal is sent from the newly created user to the different Peers!
              peer.on("signal", signal => {
                const userToSignal = user.socketid
                const callerID = socket.id
                console.log('New user send signal to old user')
                console.log('The signal', signal)
                socket.emit("sendingsignal", {userToSignal, callerID, callerName, signal})
              })

              peer.on('error', (err) => {
                console.log(err)
              })

              peers.push({
                userName: user.userName,
                socketID: user.socketid,
                peer: peer
              })
            }
          })
          store.dispatch(updatePeers(peers))
        })

        // when a new user joins the game
        // when the new user signals with the 'sendsignal' event
        socket.on('userjoined', (data) => {
          const userStream = store.getState().user.stream;

          // Check if use is already a Peer?
          const existingPeer = store.getState().game.peers.find(peer => peer.socketID === data.callerID)

          if(!existingPeer) {

            const peer = new Peer({
              initiator: false,
              trickle: false,
              stream: userStream
            })

            // Not fired on creation
            // This is run when the neewly added user accepts
            peer.on("signal", signal => {
              const callerID = data.callerID;
              console.log('Old user send signal to new user')
              console.log('The signal', signal)
              socket.emit("returningsignal", {signal, callerID})
            })

            // This triggers the above signal
            peer.signal(data.signal)

            peer.on('error', (err) => {
              console.log(err)
            })

            // This is the newly added users we add to out peers
            store.dispatch(addPeer({
              userName: data.callerName,
              socketID: data.callerID,
              peer: peer
            }));

          }

        })

        // The user who joined gets this!
        socket.on('receivingreturnedsignal', data => {
          const item = store.getState().game.peers.find(peer => peer.socketID == data.id);
          //console.log(`sending signal to ${item.userName} with socketId ${item.socketID}`)
          console.log('The new user send signal to old user again')
          console.log('the signa', data.signal)
          item.peer.signal(data.signal)
        })*/

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
