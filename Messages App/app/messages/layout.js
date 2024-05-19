import { getMessages } from "@/lib/messages";
import next from "next";

export default async function MessagesLayout({ children }) {
  //NextJs will perform request deduplication for a request made using fetch function with same API signature.

  /*
  const response = await fetch("http://localhost:8080/messages", {
    headers: {
      "X-ID": "page",
    },
  });
  */
  /*
  const response = await fetch("http://localhost:8080/messages", {
    next: {
      tags: ["msg"],
    },
  });
  const messages = await response.json();
  */

  //fetching data from DB
  const messages = await getMessages();
  const totalMessages = messages.length;

  return (
    <>
      <h1>Important Messages</h1>
      <p>{totalMessages} messages found</p>
      <hr />
      {children}
    </>
  );
}
