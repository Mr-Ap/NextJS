import { cache } from "react";
import db from "./db";

export const createUser = cache(function createUser(email, password) {
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, password);

  return result.lastInsertRowid;
});

export const findUserByEmail = cache(function findUserByEmail(email) {
  const result = db.prepare("SELECT * from users WHERE email = ?").get(email);
  return result;
});
