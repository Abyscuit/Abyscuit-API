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
  const query = `UPDATE users set isUnlimited = 1 where discordID = ${discordID};`;
  runQuery(query, console.log);
}
export function removeUnlimitedCredits(discordID: string) {
  const query = `UPDATE users set isUnlimited = 0 where discordID = ${discordID};`;
  runQuery(query, console.log);
}
export function getUsers(callback: Function) {
  runQuery('select * from users;', (users: User[]) => {
    userAccounts = users;
    return callback(users);
  });
}
export function getUserByDiscordID(id: string, callback: Function) {
  const query = `select * from users where discordID = ${id};`;
  runQuery(query, (user: User) => {
    console.log('user:\n', user);
    return callback(user);
  });
}
