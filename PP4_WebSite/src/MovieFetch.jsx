import React, { useState, useEffect } from "react";
import axios from 'axios';
import MovieDetail from "./MovieDetail";
import SearchQuery from "./SearchQuery";
import FetGenreList from "./FetGenreList";
import "./style.css";

const AuthToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjA2MDkwNDk1M2M5ODE5ZDViYmJjOTAyODVkYjkwZCIsInN1YiI6IjY1ZmRkMjk1N2Y2YzhkMDE2MzZkY2I5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jr9alQFOXm7mSGJwMRoAu2bgjOYRO1pmpugB2xK96X8';

const MovieFetch = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchQuery, setShowSearchQuery] = useState(false);
    

    useEffect(() => {
        // Fetch movies
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        language: "en",
                        sort_by: "popularity.desc"
                    },
                    headers: {
                        Accept: "application/json",
                        Authorization: AuthToken,
                    }
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMovies();

        
    }, []);

    const handleSearchInput = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            setSearchQuery(query);
            setShowSearchQuery(true);
        }
    };

    const handleClick = (id) => {
        setSelectedMovieId(id === selectedMovieId ? null : id);
    };

    function MovieDetailFunc() {
        return <MovieDetail prop={{ Id: selectedMovieId, Token: AuthToken }} />;
    }

    function HomePage() {
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
    }

    function RenderOptions() {
        if (selectedMovieId) {
            return <MovieDetailFunc />;
        } else if (showSearchQuery) {
            return <SearchQuery prop={{ MovieName: searchQuery, Token: AuthToken }} />;
        } else {
            return <HomePage />;
        }
    }

    
    //console.log("genre array:", selectedGenre);
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
            { <FetGenreList/> }
            <main id="main">
                <RenderOptions prop={{Token:AuthToken}}/>
            </main>
        </>
    );
};

export default MovieFetch;


