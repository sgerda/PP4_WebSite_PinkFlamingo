import React, { useEffect, useState } from "react";
import axios from 'axios';
import Provider from "./Provider";
import "./style.css";



const MovieDetail = ({ prop }) => {
    const Token = prop.Token;
    const Id = prop.Id;
   
    const [movieDetail, setMovieDetail] = useState({}); // Initialize as empty object

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${Id}`,
                    {
                        params: {
                            language: 'en-US',
                        },
                        headers: {
                            Accept: "application/json",
                            Authorization: Token,
                        }
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
        <>
            <div className="movie-details"> {/* Apply class name for styling */}
                {movieDetail && (
                    <div key={movieDetail.id}>
                        <h3>{movieDetail.original_title}</h3>
                        {movieDetail.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movieDetail.poster_path}`}
                                alt={movieDetail.title} 
                            />
                        )}
                        <p>
                            <strong>Synopsis:</strong> {movieDetail.overview} 
                        </p>
                        <p>
                            <strong>Release Date:</strong> {movieDetail.release_date} 
                        </p>
                        <p>
                            <strong>Tagline:</strong> {movieDetail.tagline} 
                        </p>
                        <p>
                            <strong>Genres:</strong> {movieDetail.genres && movieDetail.genres.map(genre => genre.name).join(', ')}  
                        </p>
                        <p>
                            <strong>Runtime:</strong> {movieDetail.runtime} minutes
                        </p>
                        <Provider prop={{ Id: Id, Token: Token }}/>
                    </div>
                )}
            </div>
        </>
    );
};

export default MovieDetail;
