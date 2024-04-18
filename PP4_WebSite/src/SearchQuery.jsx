import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieDetail from "./MovieDetail";

const searchQuery =({prop})=>{
    const token = prop.Token;
    const MovieName = prop.Name;
    const [query, setQuery] = useState();

    useEffect(() => {
        const fetchQery = async () => {
            try{
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie`,
                    {
                        params: {
                            query: MovieName,
                            include_adult: false,
                            language: 'en-US',
                            page: 1,

                        },
                        headers: {
                            Accept: "application/json",
                            Authorization: Token,
                        }

                    }
                )

            }catch(error){
                console.error(error);
            }
        };

    }, [prop]);

};