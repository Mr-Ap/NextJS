import NewsList from "@/components/News-List";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  //fetching data if we have separate backend server
  const fetchDataUsingRSC = async (url = `http://localhost:8080/news`) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to feth news.");
    }

    const news = await response.json();
  };
  const news = await getAllNews();

  return (
    <>
      <h1>NewsPage</h1>
      <NewsList newsList={news} />
    </>
  );
}
