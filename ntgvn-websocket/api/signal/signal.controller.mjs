import express from 'express';
import { subscribe, emit } from './signal.model.mjs';
import { resJSON } from '../../utils/request/res.mjs';

const router = express.Router();
router
    .get('/subscribe', (req, res) => {
        const result = subscribe(req);
        if (result) {
            resJSON(req, res, 200, result);
        } else {
            resJSON(req, res, 400, result);
        }
    })
    .post('/emit', (req, res) => {
        const result = emit(req);
        if (result) {
            resJSON(req, res, 200, result);
        } else {
            resJSON(req, res, 400, result);
        }
    });

export { router as SignalRouter }
