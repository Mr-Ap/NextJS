"use server";

import { uploadImage } from "@/lib/cloudnary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  const errors = [];
  if (!title || title.trim().length == 0) {
    errors.push("Title is required!");
  }
  if (!image || image.size <= 0) {
    errors.push("Valid Image is required!");
  }
  if (!content || content.trim().length === 0) {
    errors.push("Content is required!");
  }

  if (errors.length > 0) return { errors };

  let imageUrl;
  //uploading files to cloudinary
  /*
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      "File upload failed, post was not created, Please try again later!"
    );
  }
  */

  await storePost({
    imageUrl: imageUrl,
    title,
    content,
    userId: 1,
  });

  redirect("/feed");
}

export async function togglePostLike(postId, userId, formData) {
  try {
    await updatePostLikeStatus(postId, userId);
    revalidatePath('/feed');
  } catch (error) {
    console.error("Like status update failed, please try again later!");
  }
}
