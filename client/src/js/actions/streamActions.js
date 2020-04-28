import { ADD_USER_STREAM, ADD_PEER, UPDATE_PEERS } from '../constants'

export const addUserStream = (stream) => {
  return ({
    type: ADD_USER_STREAM,
    stream: stream
  })
}

export const updatePeers = (peers) => {
  return ({
    type: UPDATE_PEERS,
    peers: peers
  })
}

export const addPeer = (peer) => {
  return ({
    type: ADD_PEER,
    peer: peer
  })
}
