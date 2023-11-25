import express from 'express';
import users from './users';
import gpt from './gpt';

const router = express.Router();

router.use('/users', users);
router.use('/gpt', gpt);

export default router;
