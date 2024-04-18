import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchQuery = ({ prop }) => {
    const { Token, MovieName } = prop;
    const [query, setQuery] = useState([]);

    useEffect(() => {
        const fetchQuery = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie`,
                    {
                        params: {
                            query: MovieName,
                            include_adult: false,
                            language: 'en-US',
                            page: 1,
                        },
                        headers: {
                            Accept: "application/json",
                            Authorization: Token
                        }
                    }
                );
                setQuery(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuery();
    }, [prop]);

    console.log("this is the movie name:", MovieName);

    return (
        <>
            {query.map((movie) => (
                <div className="movie" key={movie.id}>
                    <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
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
    );
};

export default SearchQuery;
