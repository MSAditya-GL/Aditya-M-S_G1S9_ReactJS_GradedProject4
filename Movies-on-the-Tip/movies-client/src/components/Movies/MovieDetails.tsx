import { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import LoadingIndicator from "../../common/LoadingIndicator";
import IMoviesData from "../../models/IMoviesModel";
import { getMovieByTitle } from "../../services/movies";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

type Params = {
  path: string;
  category: string;
};

const MovieDetails = () => {
  const { path, category } = useParams<Params>();

  const [movies, setMovies] = useState<IMoviesData | null>(null);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      const helper = async () => {
        try {
          const details = await getMovieByTitle(
            category as string,
            path as string
          );
          setMovies(details);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      };

      helper();
    },
    [category, path] // we need to run this effect initially, and never again on any state / prop change
  );

  return (
    <div>
      {loading && <LoadingIndicator size="large" message="Loading..." />}
      {!loading && error && <Alert variant="danger">{error.message}</Alert>}
      {!loading && !error && movies && (
        <>
          <NavLink to="/movies-in-theaters">Back To Home</NavLink>
          <Row className="mx-3 my-5 m">
            <Col xs={12} lg={3} className="my-3">
              <a href={`${movies?.posterurl}`} className="w-100 h-100">
                <img
                  src={`${apiBaseUrl}/${movies.poster}`}
                  alt={movies?.title}
                  className="w-100 h-100"
                />
              </a>
            </Col>
            <Col xs={12} lg={9} className="my-3">
              <div>
                <h2>
                  {movies?.title} ({movies?.year})
                </h2>
              </div>
              <div className="my-4">
                <Row>
                  <Col xs={3}>Imdb Rating</Col>
                  <Col xs={9}>{movies?.imdbRating}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Content Rating</Col>
                  <Col xs={9}>{movies?.contentRating}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Average Rating</Col>
                  <Col xs={9}>{movies?.averageRating}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Duration</Col>
                  <Col xs={9}>{movies?.duration}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Genres</Col>
                  <Col xs={9}>
                    {movies?.genres.map((genres) => (
                      <span className="me-2" key={genres}>
                        {genres}
                      </span>
                    ))}
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Actors</Col>
                  <Col xs={9}>
                    {movies?.actors.map((actors) => (
                      <span className="me-2" key={actors}>
                        {actors}
                      </span>
                    ))}
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Released Date</Col>
                  <Col xs={9}>{movies?.releaseDate}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3}>Story Line</Col>
                  <Col xs={9}>{movies?.storyline}</Col>
                </Row>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
