import React, { useState, useEffect } from "react";
import axios from 'axios';
import ParentComponent from "./ParentComponent";
const FetGenreList = ({prop}) =>{
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelected] = useState([]);
    const Token = prop;

    useEffect(()=>{
        // Fetch genres
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

    const handleGenres = (event) => {
        const genreId = event.target.id; // Get the genre ID from the clicked element
    
        // Check if the clicked genre is already selected
        if (selectedGenre.includes(genreId)) {
            // If it is, remove it from the selectedGenre array
            setSelected(selectedGenre.filter((id) => id !== genreId));
        } else {
            // Otherwise, add it to the selectedGenre array
            setSelected([...selectedGenre, genreId]);
        }
    };

    console.log("movie genre id", selectedGenre);

    const RenderGenreTags = () => {
        return (
            <div id="genre-tags">
                {genres.map((genre) => (
                    <div
                        className="genres"
                        key={genre.id}
                        id={genre.id} // Set the genre ID as the element ID
                        onClick={handleGenres} // Attach the handleGenres function to the onClick event
                    >
                        {genre.name}
                    </div>
                ))}
            </div>
        );
    };
    

    return(
        <>
            <RenderGenreTags/>
            <ParentComponent prop ={{genreIds: selectedGenre}}/>
            
        </>
    )

};

export default FetGenreList;