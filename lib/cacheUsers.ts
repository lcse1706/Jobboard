"use server";

import { getUsers } from "../services/users";
import { User } from "./types";

let userCache: User[] | null = null;
let isCacheLoaded = false;

export const getCachedUsers = async () => {
  if (!isCacheLoaded) {
    const users = await getUsers();
    userCache = users;
    isCacheLoaded = true;
    console.log("Users loaded to cache !");
    return users;
  }
  console.log("Users already exist in cache !");
  return userCache;
};

export const invalidateUserCache = () => {
  userCache = null;
  isCacheLoaded = false;
};
