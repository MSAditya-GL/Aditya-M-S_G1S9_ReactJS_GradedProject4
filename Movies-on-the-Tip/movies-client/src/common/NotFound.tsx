import Alert from "react-bootstrap/Alert";

const NotFound = () => {
  return (
    <Alert variant="danger">
      <Alert.Heading className="text-center">No Data Found</Alert.Heading>
    </Alert>
  );
};

export default NotFound;
