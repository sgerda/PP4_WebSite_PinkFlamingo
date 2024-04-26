import { useEffect, useState } from "react";
import axios from "axios";
import MovieDetail from "./MovieDetail";

const SearchGenre =({prop})=>{

    const [Movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const { genre, Token, Rating } = prop;

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

                setMovies(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, [genre, Token]);

    const handleClick = (id) => {
        setSelectedMovieId(id === selectedMovieId ? null : id);
    };
    console.log("Rating", Rating);


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
                                        {/* Display the movie rating rounded to 1 decimal place */}
                                        <span className="green">{movie.vote_average.toFixed(1)}</span>
                                    </div>
                                    <div className="overview">
                                        {movie.overview}
                                    </div>
                                </div>
                            );
                        } else {
                            // Return null if the movie's rating is less than the provided rating
                            return null;
                        }
                    })}
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

export default SearchGenre;