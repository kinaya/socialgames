
export const wsConnect = (host, queryObject) => dispatch => {
  dispatch ({ type: 'WS_CONNECT', host: host, query: queryObject });
}

export const wsDisconnect = () => dispatch => {
  dispatch ({ type: 'WS_DISCONNECT' });
}


export const wsConnecting = host => ({ type: 'WS_CONNECTING', host });
export const wsConnected = host => ({ type: 'WS_CONNECTED', host });
export const wsDisconnected = host => ({ type: 'WS_DISCONNECTED', host });

// we dont need a reducer bc we don't need to save the data in my redux store!
// The wsConnect action is called in GameArea on mount, (when user is "logging in to a room")
