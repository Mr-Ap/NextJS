import db from "./db";

export function createUser(email, password) {
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, password);

  return result.lastInsertRowid;
}

export function findUserByEmail(email) {
  const result = db.prepare("SELECT * from users WHERE email = ?").get(email);
  return result;
}
