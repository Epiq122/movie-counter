import { clampRating } from "./movie-math";

export type MovieFormErrors = Partial<{
  title: string;
  year: string;
  rating:string
}>

export function validateMovieForm(input: {
  title: string;
  year: number;
  rating: number;
}): MovieFormErrors{
  const errors: MovieFormErrors = {};

  if (input.title.trim().length < 2) {
    errors.title = "Title must be at least 2 characters";
  }

  const currentYear = new Date().getFullYear();
  if (!Number.isFinite(input.year) || input.year < 1888 || input.year > currentYear + 1) {
    errors.year = `Year must be between 1888 and ${currentYear + 1}`;
  }

  const clamped = clampRating(input.rating);
  if(clamped !== input.rating){
    errors.rating = "Rating must be between 1 and 5";
  }
  return errors
}
