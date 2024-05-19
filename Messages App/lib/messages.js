import { cache } from "react";
import sql from "better-sqlite3";
import { unstable_cache as next_Cache } from "next/cache";

const db = new sql("messages.db");

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare("INSERT INTO messages (text) VALUES (?)").run(message);
}

//When we have internal data source, and we are making requests to it, like reading directly from DB,
//NextJs, by default, does not perform request de-duplication.
//To achieve it, need to wrap the request in cache function provided by react

//When we have internal data source, and we are making requests to it, like reading directly from DB,
//NextJs, by default, does not perform data caching .
//To achieve it, need to wrap the request in unstable_cache function provided by next/cache, now it will return promise
//To invalidate cache, we can ise revalidate,tags on it.
export const getMessages = next_Cache(
  cache(function getMessages() {
    console.log("Fetching messages from db");
    return db.prepare("SELECT * FROM messages").all();
  }),
  ["getMessages"],
  {
    // revalidate:5,
    tags: ["db-msg"],
  }
);
