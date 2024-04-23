import React from 'react';

function Header({ query, handleSearchInput, handleKeyUp, handleSearchBnt, dropdownVisible, handleGenreTagClick, genres, handleGenres,
     selectedGenres, handleRandonBtn }) {
    // Render the genre dropdown function
    
    const RenderGenreDropdown = () => {
        if (dropdownVisible) {
            return (
                <div className="genre-dropdown">
                    {genres.map((genre) => {
                        // Determine if the genre is selected
                        const isSelected = selectedGenres.includes(genre.id);
    
                        // Apply the "highlight" class if the genre is selected
                        const genreClass = isSelected ? "genre-option highlight" : "genre-option";
    
                        return (
                            <div
                                key={genre.id}
                                id={genre.id} // Add the id attribute for identification
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
        <>
            <header>
                <h3 className="Page-title">Pink Flamingo Movies</h3>
                <a href="/" className="Home-tag">Home</a>
                <div className="genre-container">
                    <div className="genre-tag" onClick={handleGenreTagClick}>
                        Genres
                    </div>
                    {RenderGenreDropdown()}
                </div>
                <button className="Search-btn" onClick={handleSearchBnt}>Search</button>
                
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
        </>
    );
}

export default Header;
