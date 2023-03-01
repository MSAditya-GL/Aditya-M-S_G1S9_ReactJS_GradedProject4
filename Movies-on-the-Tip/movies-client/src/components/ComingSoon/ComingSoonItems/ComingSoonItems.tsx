import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import IMoviesComing from "../../../models/IMoviesComing";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

type Props = {
    ComingSoon: IMoviesComing;
};

const MovieListItem = ({ ComingSoon }: Props) => {
  return (
    <Card className="w-100">
      <Card.Img
        variant="top"
        src={`${apiBaseUrl}/${ComingSoon.poster}`}
        alt={ComingSoon.title}
      />
      <Card.Body>
        <Card.Title className="d-flex align-items-start">
          <div>
            <div>{ComingSoon.title}</div>
          </div>

          <Link
            className="btn btn-sm btn-primary"
            to={`/movies-coming/${ComingSoon.id}`}
          >
            More
          </Link>
        </Card.Title>
        <Card.Text>
          <strong>Story</strong>: {ComingSoon.storyline}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieListItem;
