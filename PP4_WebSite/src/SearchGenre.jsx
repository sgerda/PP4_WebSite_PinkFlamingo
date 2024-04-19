import { useEffect, useState } from "react";
import axios from "axios";

const SearchGenre =({prop})=>{

    const [Movies, setMovies] = useState([]);
    const { genre, Token } = prop;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
                    params: {
                        language: "en",
                        sort_by: "popularity.desc",
                        with_genres: genre,
                    },
                    headers: {
                        accept: "application/json",
                        Authorization: Token,
                    }
                } );

                setMovies(moviesResponse.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [prop]);


    return (
        <>
            {Movies.map((movie) => (
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

export default SearchGenre;