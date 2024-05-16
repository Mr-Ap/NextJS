import ModalBackdrop from "@/components/Modal-Backdrop";
import { getNewsItem } from "@/lib/news";

export default async function InterceptedImagePage({ params }) {
  const slug = params.slug;
  const news = await getNewsItem(slug);

  if (!news) notFound();

  return (
    <>
      {/* <h2>Intercepted Image</h2> */}
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${news.image}`} alt={news.title} />
        </div>
      </dialog>
    </>
  );
}
