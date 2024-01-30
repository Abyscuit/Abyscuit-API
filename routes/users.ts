import express from 'express';
import { User, getUserByDiscordID, getUsers } from '../handler/usersHandler';
// import { clearTable, importAccounts } from '../handler/mysqlHandler';
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', (req, res) => {
  getUsers((users: User[]) => {
    res.json({ users });
  });
});

// define the debug route
// router.get('/debug/restart', (req, res) => {
//   clearTable();
//   importAccounts();
//   getUsers((users: User[]) => {
//     res.json(users);
//   });
// });

// define the discord id route
router.get('/:discordID', (req, res) => {
  const { discordID } = req.params;
  getUserByDiscordID(discordID, (user: User) => {
    res.json({ users: user });
  });
});

export default router;
