import { getNewsItem } from "@/lib/news";

export default async function ImagePage({ params }) {
  const slug = params.slug;
  const news = await getNewsItem(slug);

  if (!news) notFound();

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${news.image}`} alt={news.title} />
    </div>
  );
}
