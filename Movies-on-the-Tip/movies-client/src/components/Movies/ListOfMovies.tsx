import { useState, useEffect, useContext } from "react";
import SearchContext from "../../contexts/SearchContext";
import { Alert, Row, Col } from "react-bootstrap";
import { getMovies } from "../../services/movies";
import LoadingIndicator from "../../common/LoadingIndicator";
import IMoviesData from "../../models/IMoviesModel";
import MovieListItem from "./MovieItem";
import NotFound from "../../common/NotFound";

type Props = {
  category: string;
};

const ListOfMovies = (props: Props) => {
  const [movies, setMovies] = useState<IMoviesData[]>([]);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const helper = async () => {
      try {
        const movies = await getMovies(props.category);
        setMovies(movies);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
      }
    };

    helper();
  }, [props.category]);

  const { searchKey, search } = useContext(SearchContext);
  const [filteredList, setFilteredList] = useState([] as IMoviesData[]);

  const filter = () => {
    const filteredList = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredList(filteredList);
  };

  const removeMovieFromFavourite = (title: string) => {
    const moviesToShow = movies.filter((movie) => movie.title !== title);
    setMovies(moviesToShow);
  };

  useEffect(filter, [search, movies, searchKey]);

  return (
    <div>
      {loading && <LoadingIndicator size="large" message="Loading..." />}
      {!loading && error && <Alert variant="danger">{error.message}</Alert>}
      {!loading && !error && filteredList.length === 0 && <NotFound />}
      {!loading && !error && movies.length !== 0 && (
        <>
          <Row xs={2} lg={4}>
            {filteredList.map((movie) => (
              <Col key={movie.id} className="d-flex my-3 align-items-stretch">
                <MovieListItem
                  movies={movie}
                  path={props.category}
                  onRemove={removeMovieFromFavourite}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default ListOfMovies;
