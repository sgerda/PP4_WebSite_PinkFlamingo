import React, { useState, useEffect } from "react";
import axios from 'axios';
import MovieDetail from "./MovieDetail";
import SearchQuery from "./SearchQuery";
import SearchGenre from "./SearchGenre";
import "./style.css";
import Header from "./Header";

const AuthToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjA2MDkwNDk1M2M5ODE5ZDViYmJjOTAyODVkYjkwZCIsInN1YiI6IjY1ZmRkMjk1N2Y2YzhkMDE2MzZkY2I5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jr9alQFOXm7mSGJwMRoAu2bgjOYRO1pmpugB2xK96X8';

const MovieFetch = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchQuery, setShowSearchQuery] = useState(false);
    const [searchClick, setSearchClick] = useState(false);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelected] = useState([]);
    const genreString = selectedGenre.join(",");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    //const { genreIds } = prop;
    

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

        const fetchGenres = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                    headers: {
                        Accept: "application/json",
                        Authorization: AuthToken,
                    }
                });
                setGenres(response.data.genres);
            } catch (error) {
                console.error(error);
            }
        };
        fetchGenres();

        
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

    const handleSearchBnt = () =>{
        setSearchClick(true);
        
    };

    const handleGenres = (event) => {
        const genreId = event.target.id; // Get the genre ID from the clicked element
    
        // Check if the clicked genre is already selected
        if (selectedGenre.includes(genreId)) {
            // If it is, remove it from the selectedGenre array to deselect it
            setSelected(selectedGenre.filter((id) => id !== genreId));
        } else {
            // Otherwise, add it to the selectedGenre array to select it
            setSelected([...selectedGenre, genreId]);
        }
        
    };

    const handleGenreTagClick = () => {
        setDropdownVisible(!dropdownVisible);
        
    };

 

    function MovieDetailFunc() {
        return <MovieDetail prop={{ Id: selectedMovieId, Token: AuthToken }} />;
    };

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

    console.log("movie genre id", selectedGenre);   

    

    function RenderOptions() {
        if (selectedMovieId) {
            return <MovieDetailFunc />;
        } else if (showSearchQuery) {
            return <SearchQuery prop={{ MovieName: searchQuery, Token: AuthToken }} />;
        } else {
            return (
            <>
                
                {searchClick ? <SearchGenre prop={{genre: genreString, Token: AuthToken}}/> : <HomePage />}
            </>
            )
        }
    }

    
    //console.log("genre array:", selectedGenre);
    console.log("flag:", searchClick);
    
    
    return (
        <>
                <Header
                query={query}
                handleSearchInput={handleSearchInput}
                handleKeyUp={handleKeyUp}
                handleSearchBnt={handleSearchBnt}
                dropdownVisible={dropdownVisible}
                handleGenreTagClick={handleGenreTagClick}
                genres={genres}
                handleGenres={handleGenres}
                selectedGenres={selectedGenre} // Make sure to pass `selectedGenre` down as `selectedGenres`
            />
            
            
            <main id="main">
                <RenderOptions/>
            </main>
        </>
    );
};

export default MovieFetch;


