"use client";

import { useFormStatus } from "react-dom";

export default function FormActionButtons() {
  const { pending } = useFormStatus();
  
  if (pending) return <p>Submitting post...</p>;
  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}
