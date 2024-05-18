"use client";

import { useOptimistic } from "react";
import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import { togglePostLike } from "@/actions.js/posts";

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div className={`${post.isLiked ? "liked" : ""}`}>
            <form action={action.bind(null, post.id, 2)}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, setOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, newPostId) => {
      const postIndex = prevPosts.findIndex((post) => post.id === newPostId);
      if (postIndex === -1) return prevPosts;
      const post = { ...prevPosts[postIndex] };
      post.likes += post.isLiked ? -1 : 1;
      post.isLiked = !post.isLiked;
      const newPosts = [...prevPosts];
      newPosts[postIndex] = post;
      return newPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId, userId) {
    setOptimisticPosts(postId);
    await togglePostLike(postId, userId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
