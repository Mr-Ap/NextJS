import NewsList from "@/components/News-List";
import { DUMMY_NEWS } from "@/dummy-news";

export default function NewsPage() {
  return (
    <>
      <h1>NewsPage</h1>
      <NewsList newsList={DUMMY_NEWS} />
    </>
  );
}
