import { cache } from "react";
import db from "./db";

export const getTrainings = cache(function getTrainings() {
  const stmt = db.prepare("SELECT * FROM trainings");
  return stmt.all();
});
