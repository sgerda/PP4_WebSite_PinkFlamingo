import React, { useEffect, useState } from "react";
import axios from "axios";
import Provider from "./Provider";
import "./style.css";

const MovieDetail = ({ prop }) => {
    const Token = prop.Token;
    const Id = prop.Id;

    const [movieDetail, setMovieDetail] = useState({});

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${Id}`,
                    {
                        params: {
                            language: "en-US",
                        },
                        headers: {
                            Accept: "application/json",
                            Authorization: Token,
                        },
                    }
                );

                // Extract movie details from the response
                const movieData = response.data;
                setMovieDetail(movieData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovieDetail();
    }, [prop]);

    
    return (
        <main className="movie-detail-container">
            {movieDetail && (
                <div className="movie-detail">
                    <div className="poster-wrapper">
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`}
                            alt={movieDetail.title}
                            className="movie-poster"
                        />
                    </div>
                    

                    <div className="info-wrapper">
                        <h3 className="movie-title">{movieDetail.original_title}</h3>
                        <p className="synopsis"><strong>Synopsis:  </strong> {movieDetail.overview}</p>
                        <p className="genres"><strong>Genres:  </strong> {movieDetail.genres && movieDetail.genres.map(genre => genre.name).join(', ')}</p>
                        <Provider prop={{ Id: Id, Token: Token }} />
                    </div>
                </div>
            )}
        </main>
    );
};

export default MovieDetail;
