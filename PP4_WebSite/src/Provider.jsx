import { useEffect, useState } from "react";
import axios from "axios";

const Provider =({prop}) => {
    const id = prop.Id
    const Token = prop.Token;

    const [Streaming, setStreaming] = useState([]);
    const [buyProviders, setBuy] = useState([]);
    const [rentProviders, setRent] = useState([]);
    useEffect(() => {
        const fetchStream = async () => {
            try{
                const response = await axios.get (
                    `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
                    {
                        params: {
                            language: "en",
                        },
                        headers: {
                            Accept: "application/json",
                            Authorization: Token,
                        },
                    }
                );

                const results = response.data.results;
                const USdata = results.US;
                if(USdata){
                    setStreaming(USdata.flatrate || []);
                    setBuy(USdata.buy || []);
                    setRent(USdata.rent || []);
                }
                
            }catch (error){
                console.error(error);
            }
        };

        fetchStream();

    }, [prop]);

    console.log("Received Id for streaming:", id);
    const renderProviders = (providers, type) => {
        if (providers.length > 0) {
            return providers.map((provider, index) => (
                <div key={index}>
                    <img
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={provider.provider_name}
                    />
                    <p>{`${type}: ${provider.provider_name}`}</p>
                </div>
            ));
        } else {
            return <p>{`Not available for ${type}`}</p>;
        }
    };
    

    return (
        <>
            <h2>Streaming</h2>
            {renderProviders(Streaming, "Streaming")}
            <h2>Buy</h2>
            {renderProviders(buyProviders, "Buying")}
            <h2>Rent</h2>
            {renderProviders(rentProviders, "Renting")}
        </>
    );


};

export default Provider;