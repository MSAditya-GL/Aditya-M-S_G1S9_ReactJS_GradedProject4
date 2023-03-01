import { useState, useEffect } from 'react';
import { Spinner, Alert, Row, Col } from 'react-bootstrap';
import {getMovies} from '../../services/ComingSoon';
import IMoviesComing from '../../models/IMoviesComing';
import MovieListItem from './ComingSoonItems/ComingSoonItems'

const ComingSoon = () => {
      
    const [ Movies, setMovies ] = useState<IMoviesComing[]>( [] );
    const [ error, setError ] = useState<null | Error>( null );
    const [ loading, setLoading ] = useState( true );

    useEffect(
        () => {
            const helper = async () => {
                try {
                    const Movies = await getMovies();
                    setMovies( Movies );
                } catch( error ) {
                    setError( error as Error );
                } finally {
                    setLoading( false );
                }
            }
            
            helper();
        },
        [] // we need to run this effect initially, and never again on any state / prop change
    );
    
    return (
        <div>
            {
                loading && (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )
            }
            {
                !loading && error && (
                    <Alert variant="danger">
                        {error.message}
                    </Alert>
                )
            }
            {
                !loading && !error && (
                    <Row xs={1} lg={3}>
                        {
                            Movies.map(
                                Movie => (
                                    <>
                                    <Col
                                        key={Movie.id}
                                        className="d-flex my-3"
                                    >
                                        <MovieListItem
                                            ComingSoon={Movie}
                                        />
                                    </Col>
                                    </>
                                )
                            )
                        }
                    </Row>
                )
            }
        </div>
    );
}
 
export default ComingSoon;