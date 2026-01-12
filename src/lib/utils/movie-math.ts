import type { Movie } from "$lib/domain/movie";

export function countWatched(movies: Movie[]): number{
  return movies.reduce((n,m) => n + (m.status === 'watched' ? 1:0),0)
}

export function averageRating(movies: Movie[]): number{
  if (movies.length === 0) return 0;
  const sum = movies.reduce((t, m) => t + m.rating, 0);
  return sum / movies.length;;
}

export function clampRating(n: number): number{
  //1..5
  return Math.max(1,Math.min(5,n))
}
