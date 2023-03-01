import axios from 'axios';
import IMoviesComing from '../models/IMoviesComing';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const getMovies = async () => {
    const response = await axios.get( `${apiBaseUrl}/movies-coming` );
    return response.data as IMoviesComing[];
};

const getMovieById = async ( id: number | string ) => {
    const response = await axios.get( `${apiBaseUrl}/movies-coming/${id}` );
    return response.data as IMoviesComing;
};

export {
    getMovies,
    getMovieById
};