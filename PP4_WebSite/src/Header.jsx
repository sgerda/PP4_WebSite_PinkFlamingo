import React, { useState, useEffect, useRef } from 'react';

function Header({
    query,
    handleSearchInput,
    handleKeyUp,
    handleSearchBnt,
    handleRandonBtn,
    genres,
    handleGenres,
    selectedGenres,
    handleRating,
}) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [ratingVisible, setRatingVisible] = useState(false);
    const [selectedRating, setSelectedRating] = useState(null);
    
    const genreDropdownRef = useRef(null);
    const ratingDropdownRef = useRef(null);

    // Event handler function for closing the dropdowns
    const handleOutsideClick = (e) => {
        if (genreDropdownRef.current && !genreDropdownRef.current.contains(e.target)) {
            setDropdownVisible(false);
        }
        if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(e.target)) {
            setRatingVisible(false);
        }
    };

    useEffect(() => {
        // Add mouseup event listener
        document.addEventListener('mouseup', handleOutsideClick);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mouseup', handleOutsideClick);
        };
    }, []);

    // Event handler for handling rating change
    const handleRatingChange = (e) => {
        const ratingValue = parseInt(e.target.value);
        setSelectedRating(ratingValue);
        handleRating(ratingValue); // Pass the selected rating to the parent component
    };

    const renderGenreDropdown = () => {
        if (dropdownVisible) {
            return (
                <div className="genre-dropdown" ref={genreDropdownRef}>
                    {genres.map((genre) => {
                        const isSelected = selectedGenres.includes(genre.id);
                        const genreClass = isSelected ? 'genre-option highlight' : 'genre-option';
                        

                        return (
                            <div
                                key={genre.id}
                                id={genre.id}
                                className={genreClass}
                                onClick={() => handleGenres({ target: { id: genre.id } })}
                            >
                                {genre.name}
                            </div>
                        );
                    })}
                </div>
            );
        }
        return null;
    };

    const renderRatingDropdown = () => {
        if (ratingVisible) {
            return (
                <div className="rating-dropdown" ref={ratingDropdownRef}>
                    {Array.from({ length: 10 }, (_, index) => {
                        const value = index + 1;
                        return (
                            <label key={value}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={value}
                                    checked={selectedRating === value}
                                    onChange={handleRatingChange}
                                />
                                {value}
                            </label>
                        );
                    })}
                </div>
            );
        }
        return null;
    };

    const renderRating = () => {
        return (
            <div className="rating-container">
                <div className="rating-tag" onClick={() => setRatingVisible(!ratingVisible)}>
                    Ratings
                </div>
                {renderRatingDropdown()}
            </div>
        );
    };

    return (
        <header>
            <h3 className="Page-title">Pink Flamingo Movies</h3>
            <a href="/" className="Home-tag">Home</a>
            <div className="genre-container">
                <div className="genre-tag" onClick={() => setDropdownVisible(!dropdownVisible)}>
                    Genres
                </div>
                {renderGenreDropdown()}
            </div>
            <button className="random-btn" onClick={handleRandonBtn}>Randomize</button>
            {renderRating()}
            <input
                type="text"
                placeholder="Search"
                id="search"
                className="search"
                value={query}
                onChange={handleSearchInput}
                onKeyUp={handleKeyUp}
            />
            <h3 className="profile">User Profile</h3>
        </header>
    );
}

export default Header;

