import { Server } from 'socket.io';

let SocketServer = null;

let SocketClients = null;

const createSocketServer = (server, transports = ['websocket', 'polling']) => {
    const socketServer = new Server(server, {
        transports: transports
    });
    SocketServer = socketServer;
    SocketClients = new Map();
}

const emitData = async (key, data) => {
    SocketServer.emit(key, {
        message: data
    });
}

export {
    createSocketServer,
    SocketServer,
    SocketClients,
    emitData
}
