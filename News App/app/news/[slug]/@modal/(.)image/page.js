"use client";

import { DUMMY_NEWS } from "@/dummy-news";
import { useRouter } from "next/navigation";

export default function InterceptedImagePage({ params }) {
  const router = useRouter();
  const slug = params.slug;
  const news = DUMMY_NEWS.find((news) => news.slug === slug);

  if (!news) notFound();

  return (
    <>
      {/* <h2>Intercepted Image</h2> */}
      <div className="modal-backdrop" onClick={router.back} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${news.image}`} alt={news.title} />
        </div>
      </dialog>
    </>
  );
}
