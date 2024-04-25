import React, { useState, useEffect, useRef } from 'react';

function Header({ query, handleSearchInput, handleKeyUp, handleSearchBnt, handleGenreTagClick, handleRandonBtn, genres, handleGenres, selectedGenres }) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const genreDropdownRef = useRef(null);

    // Event handler function for closing the dropdown
    const handleOutsideClick = (e) => {
        if (genreDropdownRef.current && !genreDropdownRef.current.contains(e.target)) {
            setDropdownVisible(false);
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

    const RenderGenreDropdown = () => {
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

    return (
        <header>
            <h3 className="Page-title">Pink Flamingo Movies</h3>
            <a href="/" className="Home-tag">Home</a>
            <div className="genre-container">
                <div className="genre-tag" onClick={() => setDropdownVisible(!dropdownVisible)}>
                    Genres
                </div>
                {RenderGenreDropdown()}
            </div>
            <button className="Search-btn" onClick={handleSearchBnt}>Search</button>
            <button className="random-btn" onClick={handleRandonBtn}>Randomize</button>
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
