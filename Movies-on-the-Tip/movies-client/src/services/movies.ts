import axios from 'axios';
import IMoviesData from '../models/IMoviesModel';


const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const getMovies = async (category: string) => {
    const response = await axios.get(`${apiBaseUrl}/${category}`);
    return response.data as IMoviesData[];
};


const getMovieByTitle = async (moviesCategory: string, title: string) => {
    const response = await axios.get<IMoviesData[]>(
        `${apiBaseUrl}/${moviesCategory}/?title=${title}`
    );
    if (response.data === null || response.data.length === 0) {
        return null;
    }
    return response.data[0];
};

const postFavoriteMovie = async (Category: string, favouriteMovie: IMoviesData) => {
    const response = await axios
        .post(`${apiBaseUrl}/${Category}`, favouriteMovie, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    return response.data as IMoviesData[];
};

const deleteFavoriteMovie = async (Category: string, movieId: string | number) => {
    const response = await axios.delete(
        `${apiBaseUrl}/${Category}/${movieId}`
    );
    return response.data as IMoviesData;
};

const getLastId = async (Category: string) => {
    const response = await axios.get<IMoviesData[]>(
        `${apiBaseUrl}/${Category}?_sort=id&_order=desc`
    );

    if (response.data === null || response.data.length === 0) {
        return 0;
    }
    return response.data[0].id ?? 0;
};

export {
    getMovies,
    getMovieByTitle,
    postFavoriteMovie,
    deleteFavoriteMovie,
    getLastId,
};
