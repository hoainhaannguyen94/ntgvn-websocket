import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'node:path';
import { domainChecker } from './middleware/domain-checker.mjs';
import { rateLimitRequest } from './middleware/request-limiter.mjs';
import { Logger } from './utils/logger/logger.mjs';
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

export default app;
