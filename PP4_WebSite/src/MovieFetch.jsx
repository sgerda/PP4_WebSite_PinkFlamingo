import React, { useState, useEffect } from "react";
import axios from 'axios';
import MovieDetail from "./MovieDetail";
import SearchQuery from "./SearchQuery";
import "./style.css";

const AuthToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjA2MDkwNDk1M2M5ODE5ZDViYmJjOTAyODVkYjkwZCIsInN1YiI6IjY1ZmRkMjk1N2Y2YzhkMDE2MzZkY2I5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jr9alQFOXm7mSGJwMRoAu2bgjOYRO1pmpugB2xK96X8';

const MovieFetch = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [query, setQuery] = useState("");
    const [showSearchQuery, setShowSearchQuery] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movieResponse = await axios.get(
                    'https://api.themoviedb.org/3/movie/popular',
                    {
                        params: {
                            language: "en",
                            sort_by: "popularity.desc"
                        },
                        headers: {
                            Accept: "application/json",
                            Authorization: AuthToken,
                        },
                    }
                );

                setMovies(movieResponse.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();

    }, []);

    const handleClick = (id) => {
        setSelectedMovieId(id === selectedMovieId ? null : id);
    };

    const handleSearchInput = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {

            // Trigger the search and show the SearchQuery component
            setShowSearchQuery(true);
        }
    };

    function MovieDetailFunc(){
        return <MovieDetail prop={{ Id: selectedMovieId, Token: AuthToken }} />;
    };

    function HomePage (){
        return (
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
        );
    };

    function RenderOptions(){
        if(selectedMovieId){
            return(<MovieDetailFunc/>);
        }
        else if(showSearchQuery){
            return(<SearchQuery prop={{MovieName: query, Token: AuthToken}}/>);
        }
        else{
            return(<HomePage/>);
        }
    }

    

    return (
        <>
            <header>
                <input
                    type="text"
                    placeholder="Search"
                    id="search"
                    className="search"
                    value={query}
                    onChange={handleSearchInput}
                    onKeyUp={handleKeyUp}
                />
            </header>

            
    
            { <main id="main">
                {<RenderOptions/>}
                {/* {selectedMovieId ? (<MovieDetailFunc />) : (<HomePage/>)} */} 
            </main> }
        </>
    );
};

export default MovieFetch;
