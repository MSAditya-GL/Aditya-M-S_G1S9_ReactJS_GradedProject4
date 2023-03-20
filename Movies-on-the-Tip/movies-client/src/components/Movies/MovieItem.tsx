import React from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import IMoviesData from "../../models/IMoviesModel";
import { toast } from "react-toastify";
import {
  postFavoriteMovie,
  deleteFavoriteMovie,
  getLastId,
  getMovieByTitle,
} from "../../services/movies";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

type Props = {
  movies: IMoviesData;
  path: string;
  onRemove: (title: string) => void;
};

const MovieListItem = ({ movies, path, onRemove }: Props) => {
  const toastTimer = 1500;
  const isFavouritePage = path === "favourite";

  let toPath = `${movies.title}`;

  const addFavourite = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const movieTitle = await getMovieByTitle("favourite", movies.title);
      if (movieTitle !== null) {
        toast.error("Already added in favourites...", {
          autoClose: toastTimer,
        });
        return;
      }

      const lastId = await getLastId("favourite");
      movies.id = lastId + 1;
      await postFavoriteMovie("favourite", movies);
      toast.success("Successfully added to favourites", {
        autoClose: toastTimer,
      });
    } catch (error: any) {
      toast.error("Movie not added the favourites...", {
        autoClose: toastTimer,
      });
    }
  };

  const removeFavourite = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      if (movies.id === null) {
        toast.warn("Cannot Find the Movie...");
      }
      await deleteFavoriteMovie("favourite", movies.id);
      toast.success("Successfully removed from favourites...", {
        autoClose: toastTimer,
      });
      onRemove(movies.title);
    } catch (errormsg: any) {
      toast.error("Unable to remove from favourites...", {
        autoClose: toastTimer,
      });
    }
  };

  return (
    <>
      <Card className="w-100">
        <Image
          fluid
          rounded-start
          src={`${apiBaseUrl}/${movies.poster}`}
          alt={movies.title}
          style={{ height: "343px" }}
        />
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <div>
              <div>{movies.title}</div>
            </div>

            <Link
              className="btn btn-sm btn-primary me-2 mb-2 "
              to={toPath}
              style={{ height: "35px" }}
            >
              More
            </Link>
          </Card.Title>
          <Card.Text className="text-center">
            <Button
              style={{ border: "none", background: "none" }}
              hidden={isFavouritePage}
              onClick={addFavourite}
              variant="light"
            >
              <FontAwesomeIcon
                icon={heartOutline}
                className="me-2"
                style={{ color: "red" }}
              />
              Add to favorites
            </Button>
            <Button
              style={{ border: "none", background: "none" }}
              hidden={!isFavouritePage}
              onClick={removeFavourite}
              variant="light"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="me-2"
                style={{ color: "red" }}
              />
              Remove from favourite
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default MovieListItem;
