import { WS_CONNECT, WS_DISCONNECT } from '../constants'

export const wsConnect = (host, queryObject) => dispatch => {
  dispatch ({
    type: WS_CONNECT,
    host: host,
    query: queryObject
  });
}

export const wsDisconnect = () => dispatch => {
  dispatch ({
    type: WS_DISCONNECT
  });
}
