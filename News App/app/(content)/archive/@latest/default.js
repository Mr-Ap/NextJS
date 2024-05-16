import { getLatestNews } from "@/lib/news";
import NewsList from "@/components/News-List";

export default async function DefaultLatestNewsPage() {
  const latestNews = await getLatestNews();
  return (
    <>
      <h1>Default Latest News</h1>
      <NewsList newsList={latestNews} />
    </>
  );
}
