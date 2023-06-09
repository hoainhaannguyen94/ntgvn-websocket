import express from 'express';
import { resHanlder } from '../../utils/res.mjs';

const router = express.Router();
router
    .get('/', async (req, res) => {
        resHanlder(req, res, 200, true);
    });

export { router as PingRouter }
