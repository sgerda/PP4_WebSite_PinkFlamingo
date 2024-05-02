import React, { useState, useEffect } from "react";
import axios from 'axios';
import MovieDetail from "./MovieDetail";


const Randomlist = ({prop}) =>{

    const randomNumber = Math.floor(Math.random() * (500 - 1 + 1)) + 1;

    const [Movies, setMovies] = useState([]);
    const [genre, setGenres] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const{Token, Rating}=prop;

    useEffect(() => {
        // Fetch movies
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
                    params: {
                        language: "en",
                        sort_by: "popularity.desc",
                        page: randomNumber,
                    },
                    headers: {
                        Accept: "application/json",
                        Authorization: Token,
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
                        Authorization: Token,
                    }
                });
                setGenres(response.data.genres);
            } catch (error) {
                console.error(error);
            }
        };
        fetchGenres();

        
    }, [prop]);

    const handleClick = (id) => {
        setSelectedMovieId(id === selectedMovieId ? null : id);
    };

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
            return <MovieDetail prop={{ Id: selectedMovieId, Token: Token }} />;
        } else {
            return (
                <>
                    {Movies.map((movie) => {
                        // Check if the movie's rating (vote average) is greater than or equal to the provided rating
                        if (movie.vote_average >= Rating) {
                            return (
                                <div className="movie" key={movie.id}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                        onClick={() => handleClick(movie.id)}
                                    />
                                    <div className="movie-info">
                                        <h3>{movie.title}</h3>
                                       
                                        <span className={getcolor(movie.vote_average)}>{movie.vote_average.toFixed(1)}</span>
                                    </div>
                                    <div className="overview">
                                        {movie.overview.slice(1,100) + "...."}
                                    </div>
                                </div>
                            );
                        } else {
                            
                            return null;
                        }
                    })}
                </>
            );
        }
    };

    return(
        <>
            <RenderOptions/>
        </>
    );
};

export default Randomlist;