import NavigationMenu from "./components/NavigationMenu";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import ComingSoonPage from "./pages/ComingSoonPage";
import { useState, ChangeEvent } from "react";
import SearchContext from "./contexts/SearchContext";
import MoviesInTheatersPage from "./pages/MoviesInTheatersPage";
import TopRatedIndianPage from "./pages/TopRatedIndianPage";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage";
import FavoritesPage from "./pages/FavoritesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage ";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [searchKey, setSearchKey] = useState("");
  const search = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value);
  };

  return (
    <>
      <SearchContext.Provider value={{ search, searchKey }}>
        <NavigationMenu />

        <Container className="my-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies-coming" element={<ComingSoonPage />} />
            <Route
              path="/movies-in-theaters"
              element={<MoviesInTheatersPage />}
            />
            <Route path="/top-rated-india" element={<TopRatedIndianPage />} />
            <Route path="/top-rated-movies" element={<TopRatedMoviesPage />} />
            <Route path="/favourite" element={<FavoritesPage />} />
            <Route path="/:category/:path" element={<MovieDetailsPage />} />
          </Routes>
          <ToastContainer />
        </Container>
      </SearchContext.Provider>
    </>
  );
}

export default App;
