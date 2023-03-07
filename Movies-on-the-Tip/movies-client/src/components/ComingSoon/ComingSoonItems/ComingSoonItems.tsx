import { Card,Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import IMoviesComing from "../../../models/IMoviesComing";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

type Props = {
    comingSoon: IMoviesComing;
};

const MovieListItem = ({ comingSoon }: Props) => {
  return (
    <Card className="w-100">
      <Image
        fluid
        rounded-start
        src={`${apiBaseUrl}/${comingSoon.poster}`}
        alt={comingSoon.title}
        style={{height: '343px'}}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div>
            <div>{comingSoon.title}</div>
          </div>

          <Link
            className="btn btn-sm btn-primary me-2 mb-2 "
            to={`/movies-coming/${comingSoon.id}`}
          >
            More
          </Link>
        </Card.Title>
        
      </Card.Body>
    </Card>
  );
};

export default MovieListItem;
