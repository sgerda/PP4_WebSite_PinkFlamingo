import React, { useState, useEffect } from "react";
import axios from 'axios';
import MovieDetail from "./MovieDetail";
import "./style.css";

const AuthToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjA2MDkwNDk1M2M5ODE5ZDViYmJjOTAyODVkYjkwZCIsInN1YiI6IjY1ZmRkMjk1N2Y2YzhkMDE2MzZkY2I5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jr9alQFOXm7mSGJwMRoAu2bgjOYRO1pmpugB2xK96X8';

const MovieFetch = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movieResponse = await axios.get( 
                    'https://api.themoviedb.org/3/movie/popular',
                    {
                        params: {
                            language: "en",
                            sort_by: "Popularity.desc",
                        },
                        headers: {
                            Accept: "application/json",
                            Authorization: AuthToken,
                        },
                    }
                );

                setMovies(movieResponse.data.results);
            }
            catch (error) {
                console.error(error);
            }
        };

        fetchMovies();

    }, []);

    const handleClick = (id) => {
        setSelectedMovieId(id === selectedMovieId ? null : id);
    }

    return (
        <>
            <header>
                <form id="form">
                    <input type="text" placeholder="Search" id="search" className="search"/>
                </form>
            </header>
    
            <main id="main">
                {selectedMovieId ? (
                    <MovieDetail prop={{ Id: selectedMovieId, Token: AuthToken }} />
                ) : (
                    <>
                        {movies.map((movie) => (
                            <div className="movie" key={movie.id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title} 
                                    onClick={() => handleClick(movie.id)}
                                />
                                <div className="movie-info">
                                    <h3>{movie.title}</h3>
                                    <span className="green">{movie.vote_average}</span>
                                </div>
                                <div className="overview">
                                    {movie.overview}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </main>
        </>
    );
};

export default MovieFetch;

