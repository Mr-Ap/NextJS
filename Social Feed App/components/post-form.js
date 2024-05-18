"use client";

import FormActionButtons from "./form-actions";
import { useFormState } from "react-dom";

const initialState = {
  errors: [],
};

export default function PostForm({ action }) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
            required
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" required />
        </p>
        <p className="form-actions">
          <FormActionButtons />
        </p>
        {state.errors && (
          <ul className="form-errors">
            {state.errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
}
