import React, { useEffect, useState } from "react";
import axios from 'axios';

// API Authentication Token
const AuthToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjA2MDkwNDk1M2M5ODE5ZDViYmJjOTAyODVkYjkwZCIsInN1YiI6IjY1ZmRkMjk1N2Y2YzhkMDE2MzZkY2I5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jr9alQFOXm7mSGJwMRoAu2bgjOYRO1pmpugB2xK96X8';

// MovieFetch component fetches data from the API
const MovieFetch = ({/* prop -->*/ }) => {
    const [Movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const MovieResponse = await axios.get( 
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

                // Display the returned data into the console log
                // This is for debugging purposes only
                console.log("Movie Response: ", MovieResponse.data);
                setMovies(MovieResponse.data.results);
            }
            catch (error) {
                console.error(error);
            }
        };

        fetchMovies();

    }, []);


    // Return the fetched data
    return (
        <>
            <div>
                {Movies.map((movie) => (
                    <div key={movie.id}>
                        <h3>{movie.title}</h3> {/* Fixed typo here */}
                        {movie.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title} 
                            />
                        )}
                        <p>
                        <strong>Synopsis:
                            </strong> {movie.overview} 
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MovieFetch;
