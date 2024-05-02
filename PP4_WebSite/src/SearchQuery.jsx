import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieDetail from "./MovieDetail";

const SearchQuery = ({ prop }) => {
    const { Token, MovieName } = prop;
    const [query, setQuery] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

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

    const handleClick = (id) => {
        setSelectedMovieId(id === selectedMovieId ? null : id);
    };
    console.log("this is the movie name:", MovieName);

    function getcolor(vote){
        if(vote>=8){
            return 'green'
        }
        else if( vote >=5){
            return 'orange'
        }
        else{
            return 'red'
        }
    };

    function RenderOptions() {
        if (selectedMovieId) {
            return <MovieDetail prop={{ Id: selectedMovieId, Token:Token }}/>;
        } else {
            return (
                <>
                    {query.map((movie) => (
                        <div className="movie" key={movie.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                onClick={() => handleClick(movie.id)}
                            />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <span className={getcolor(movie.vote_average)}>{Math.ceil(movie.vote_average)}</span>
                            </div>
                            <div className="overview">
                                {movie.overview.slice(1,100) + "...."}
                            </div>
                        </div>
                    ))}
                </>
            );
        }
    };

    return (
        <>
            <RenderOptions/>
        </>
    );
};

export default SearchQuery;
