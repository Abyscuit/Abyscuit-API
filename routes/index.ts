import express from 'express';
// import users from './users';
import gpt from './gpt';
import authorize from './authorize';

const router = express.Router();

// router.use('/users', users);
router.use('/gpt', gpt);
router.use('/authorize', authorize);

export default router;
