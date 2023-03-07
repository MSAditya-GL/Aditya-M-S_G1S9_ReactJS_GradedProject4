import { useState, useEffect } from "react";
import { Spinner, Alert, Row, Col } from "react-bootstrap";
import { getMovies } from "../../services/ComingSoon";
import IMoviesComing from "../../models/IMoviesComing";
import MovieListItem from "./ComingSoonItems/ComingSoonItems";

const ComingSoon = () => {
  const [movies, setMovies] = useState<IMoviesComing[]>([]);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      const helper = async () => {
        try {
          const movies = await getMovies();
          setMovies(movies);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      };

      helper();
    },
    [] // we need to run this effect initially, and never again on any state / prop change
  );

  // to maintain user's input within search box
  const [searchKey, setSearchKey] = useState("");
  const [filteredList, setFilteredList] = useState([] as IMoviesComing[]);

  const filter = () => {
    const filteredList = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredList(filteredList);
  };

  useEffect(filter, [searchKey, movies]);

  return (
    <div>
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!loading && error && <Alert variant="danger">{error.message}</Alert>}
      {movies.length !== 0 && (
        <>
          <input
            type="search"
            placeholder="search movie"
            className="form-control my-3"
            value={searchKey}
            onChange={(event) => setSearchKey(event.target.value)}
          />

          <Row xs={1} lg={4}>
            {filteredList.map(movie => (
              <Col key={movie.id} className="d-flex my-3 align-items-stretch">
                <MovieListItem comingSoon={movie} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default ComingSoon;
