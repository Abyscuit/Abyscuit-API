/* eslint-disable @typescript-eslint/ban-types */
import { runQuery } from './mysqlHandler';

export type User = {
  id: number;
  discordID: number;
  username: string;
  email: string;
  credits: number;
  isUnlimited: boolean;
};

export let userAccounts = [] as User[];

export function addUnlimitedCredits(discordID: string) {
  const query = `UPDATE users set isUnlimited = 1 where discordID = ?;`;
  runQuery(query, [discordID], console.log);
}
export function removeUnlimitedCredits(discordID: string) {
  const query = `UPDATE users set isUnlimited = 0 where discordID = ?;`;
  runQuery(query, [discordID], console.log);
}
export function getUsers(callback: Function) {
  runQuery('select * from users;', undefined, (users: User[]) => {
    userAccounts = users;
    return callback(users);
  });
}
export function getUserByDiscordID(id: string, callback: Function) {
  const query = `select * from users where discordID = ?;`;
  runQuery(query, [id], (user: User) => {
    return callback(user);
  });
}
