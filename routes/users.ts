import express from 'express';
import { User, getUserByDiscordID, getUsers } from '../handler/usersHandler';
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', (req, res) => {
  getUsers((users: User[]) => {
    res.json(users);
  });
});
// define the about route
router.get('/:discordID', (req, res) => {
  const { discordID } = req.params;
  getUserByDiscordID(discordID, (user: User) => {
    res.json(user);
  });
});

export default router;
