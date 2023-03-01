import NavigationMenu from "./components/NavigationMenu";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import ComingSoonPage from "./pages/ComingSoonPage";

function App() {
  return (
      <>
        <NavigationMenu />

        <Container className="my-4">
          <Routes>
            <Route path="/" element={<ComingSoonPage />} />
            <Route path="/movies-coming" element={<ComingSoonPage />} />
            {/*
          <Route path="/movies-in-theaters" element={<MoviesInTheatersPage />} />
          <Route path="/top-rated-india/:id" element={<TopRatedIndian />} />
          <Route path="/top-rated-movies" element={<TopRratedMovies />} />
          <Route path="/top-rated-movies" element={<Favorites />} />
  */}
          </Routes>
        </Container>
      </>
  );
}

export default App;
