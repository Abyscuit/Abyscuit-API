import express from 'express';
import accounts from './accounts';
import gpt from './gpt';

const router = express.Router();

router.use('/accounts', accounts);
router.use('/gpt', gpt);

export default router;
