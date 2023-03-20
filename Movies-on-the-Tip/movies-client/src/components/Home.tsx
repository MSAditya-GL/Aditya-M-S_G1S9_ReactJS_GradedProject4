import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div>
      <h1>
        <FontAwesomeIcon
          icon={faClapperboard}
          style={{ fontSize: "0.9em", marginRight: "10px" }}
        />
        Introduction to Movies-On the Tip
      </h1>
      <hr />
      <br />
      <p style={{ fontSize: "1.3em" }}>
        This website accumulates the movies list released across the globe. The
        details come from a json server and the website uses this data.
      </p>
    </div>
  );
};

export default Home;
