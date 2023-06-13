import express from 'express';
import { subscribe, emit } from './signal.model.mjs';
import { resHanlder } from '../../utils/request/res.mjs';

const router = express.Router();
router
    .get('/subscribe', async (req, res) => {
        const result = await subscribe(req);
        if (result) {
            resHanlder(req, res, 200, result);
        } else {
            resHanlder(req, res, 400, result);
        }
    })
    .post('/emit', async (req, res) => {
        const result = await emit(req);
        if (result) {
            resHanlder(req, res, 200, result);
        } else {
            resHanlder(req, res, 400, result);
        }
    });

export { router as SignalRouter }
