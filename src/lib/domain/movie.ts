export type MovieId = string;

export type WatchStatus = 'unwatched' | 'watched';

export interface Movie{
  id: MovieId;
  title: string;
  year: number;
  rating: number;
  status: WatchStatus;
  createdAt: number;
}

export function createMovie(input: {
  title: string;
  year: number;
  rating: number;
}): Movie{
  return {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    year: input.year,
    rating: input.rating,
    status: 'unwatched',
    createdAt: Date.now()
  };
}
