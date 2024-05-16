import { getLatestNews } from "@/app/lib/news";
import NewsList from "@/components/News-List";

export default function DefaultLatestNewsPage() {
  const latestNews = getLatestNews();
  return (
    <>
      <h1>Default Latest News</h1>
      <NewsList newsList={latestNews} />
    </>
  );
}
