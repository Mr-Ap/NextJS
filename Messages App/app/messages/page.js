import Messages from "@/components/messages";
import { unstable_noStore as next_noStore } from "next/cache";

//Cache invalidation techniques at file level
//1. export revalidate constant
//2. export dynamic constant
/*
export const revalidate = 5;
export const dynamic = "force-dynamic";
*/

export default async function MessagesPage() {
  //NextJs will perform request deduplication for a request made using fetch function with same API signature.
  /*
  const response = await fetch("http://localhost:8080/messages", {
    headers: {
      "X-ID": "page",
    },
  });
  */

  //Cache invalidation techniques at specific path,function and component level
  //1. use revalidatePath() -> onDemand
  //2. pass no-store in fetch function
  //3. use next-revalidate object
  //4. use next-revalidateTags -> onDemand
  //5. use noStore from next/cache

  const response = await fetch("http://localhost:8080/messages", {
    //cache: "no-store",
    next: {
      // revalidate: 5,
      tags: ["msg"],
    },
  });

  //5. component level cache invalidation
  /*  next_noStore();*/

  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
