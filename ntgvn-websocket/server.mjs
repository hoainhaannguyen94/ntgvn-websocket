import http from 'node:http';
import { HTTP_PORT, HOSTNAME, NODE_ENV } from './config/global.mjs';
import { Logger } from './utils/logger/logger.mjs';
import { cleanUp } from './clean-up.mjs';
import { SocketServer, SocketClients, createSocketServer } from './utils/socket/socket.mjs';
import app from './app.mjs';

// HTTP SERVER
const httpServer = http.createServer(app);
createSocketServer(httpServer);
SocketServer.on('connection', socket => {
    Logger.log('info', `New Socket Client connected with id ${socket.id}`);
    SocketClients.set(socket.id, socket);
    socket.on('disconnect', () => {
        SocketClients.delete(socket.id);
        Logger.log('info', `Socket Client with id ${socket.id} disconnected`);
    });
});
httpServer.once('listening', () => {
    Logger.log('info', `Server listening at http://${HOSTNAME}:${HTTP_PORT} in ${NODE_ENV} environment`);
    Logger.log('info', `Socket server listening at ws://${HOSTNAME}:${HTTP_PORT} in ${NODE_ENV} environment`);
});
httpServer.listen({ port: HTTP_PORT, hostname: HOSTNAME });

// CLEAN UP
['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM'].forEach((eventType) => {
    process.on(eventType, eventDetails => {
        cleanUp.bind(null, eventType, eventDetails)();
    });
});
