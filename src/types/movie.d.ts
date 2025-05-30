export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export type Movies = Movie[];

export interface MovieResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}
