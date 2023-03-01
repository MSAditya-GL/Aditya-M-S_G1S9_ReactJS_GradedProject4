export default interface IMoviesComing {
  id: number,
  title: string,
  year: string,
  genres: string[],
  ratings: number[],
  poster: string,
  contentRating: number,
  duration: string,
  releaseDate: Date,
  averageRating: number,
  originalTitle: string,
  storyline: string,
  actors: string[],
  imdbRating: number,
  posterurl: string
}