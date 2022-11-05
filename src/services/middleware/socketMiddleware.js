import { getCookie } from '../../utils/utils';

export const socketMiddleware = (wsUrl, wsActions, auth) => {
  return store => {
    let socket = null;
    let connected = false;
    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const token = auth ? getCookie('token') : null;
      if (type === wsInit) {
        socket = token
          ? new WebSocket(`${wsUrl}?token=${token}`)
          : new WebSocket(`${wsUrl}`);
      }
      if (socket) {
        connected = true;
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
          if (!connected) {
            setTimeout(dispatch(wsInit), 1000)
          }
        };

        if (wsClose && type === wsClose && socket) {
          socket.onclose();
          connected = false;
        }

        if (wsSendMessage && type === wsSendMessage && socket) {
          const message = token ? { ...payload, token } : { ...payload };
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
};
