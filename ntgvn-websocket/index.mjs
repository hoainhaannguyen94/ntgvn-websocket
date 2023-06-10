import http from 'node:http';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'node:path';
import { domainChecker } from './middlewares/domain.checker.mjs';
import { rateLimitRequest } from './middlewares/request-limiter.mjs';
import { HTTP_PORT, HOSTNAME, NODE_ENV } from './settings/global.setting.mjs';
import { Logger } from './utils/logger.mjs';
import { cleanUp } from './clean-up.mjs';
import { SocketServer, SocketClients, createSocketServer } from './socket/socket.mjs';
import { PingRouter } from './api/ping/ping.controller.mjs';
import { SignalRouter } from './api/signal/signal.controller.mjs';

const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.raw({ limit: '50mb' }));
app.use(express.text({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet());
app.use(express.static(__dirname + '/public'));

app.use('/websocket/api/v1/ping', rateLimitRequest(), domainChecker, PingRouter);
app.use('/websocket/api/v1/signal', rateLimitRequest(), domainChecker, SignalRouter);

app.use('/', (req, res) => {
    Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 404`);
    res.status(404).json({ message: 'Not found' });
});

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
