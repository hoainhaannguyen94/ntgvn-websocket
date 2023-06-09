import { Server } from 'socket.io';
import { ENABLE_SOCKET } from '../settings/socket.setting.mjs';

let SocketServer = null;

let SocketClients = null;

const createSocketServer = (server, transports = ['websocket', 'polling']) => {
    if (ENABLE_SOCKET) {
        const socketServer = new Server(server, {
            transports: transports
        });
        SocketServer = socketServer;
        SocketClients = new Map();
    }
}

const emitData = async (key, data) => {
    if (ENABLE_SOCKET && SocketServer) {
        SocketServer.emit(key, {
            message: data
        });
    }
}

export {
    createSocketServer,
    SocketServer,
    SocketClients,
    emitData
}
