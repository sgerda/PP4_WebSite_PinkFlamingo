import { useEffect, useState } from "react";
import axios from "axios";
import MovieDetail from "./MovieDetail";

const SearchGenre =({prop})=>{

    const [Movies, setMovies] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const { genre, Token, Rating } = prop;
    const [RoundedRating, setRounded] = useState([]);

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
    }, [genre, Token, Rating]);

    const handleClick = (id) => {
        setSelectedMovieId(id === selectedMovieId ? null : id);
    };
    console.log("Rating", Rating);

    function getcolor(vote){
        if(vote>=8){
            return 'green'
        }
        else if( vote >=5 && vote < 8){
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
                        {setRounded(Math.ceil(movie.vote_average))}
                        // Check if the movie's rating (vote average) is greater than or equal to the provided rating
                        if (Math.ceil(movie.vote_average) >= Rating) {
                            return (
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
                                        {movie.overview.slice(1,100) + " ...."}
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
    


    return (
        <>
            <RenderOptions/>
        </>
    );
   


};

export default SearchGenre;