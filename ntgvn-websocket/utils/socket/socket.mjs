import { Server } from 'socket.io';

let SocketServer = null;

let SocketClients = null;

const createSocketServer = (server, transports = ['websocket', 'polling']) => {
    SocketServer = new Server(server, {
        transports: transports
    });
    SocketClients = new Map();
}

const emitData = (key, data) => {
    return SocketServer.emit(key, {
        message: data
    });
}

export {
    createSocketServer,
    SocketServer,
    SocketClients,
    emitData
}
