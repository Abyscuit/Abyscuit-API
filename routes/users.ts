import express from 'express';
import {
  User,
  getUserByDiscordID,
  getUsers,
} from '../handler/users/usersHandler';
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', (req, res) => {
  getUsers((users: User[]) => {
    console.log('users:\n', users);
    res.send(`All Users: <br />
    ${JSON.stringify(users)}`);
  });
});
// define the about route
router.get('/:discordID', (req, res) => {
  const discordID = req.params.discordID;
  getUserByDiscordID(discordID, (user: User) => {
    console.log('user:\n', user);
    res.send(`${discordID}'s User Info <br />
    ${JSON.stringify(user)}`);
  });
});

export default router;
