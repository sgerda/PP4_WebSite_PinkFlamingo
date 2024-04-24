import React,{ useState, useEffect, useRef } from 'react';


function Header({ query, handleSearchInput, handleKeyUp, handleSearchBnt, handleGenreTagClick, genres, handleGenres,
     selectedGenres, handleRandonBtn }) {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const closeMenu = useRef(null);
    // Render the genre dropdown function
        //need to fix the click anywhere in the screen to close genre 

    useEffect(()=>{
        const handleGenreTagClick = (e) => {
            if(!closeMenu.current.contains(e.target)){
                setDropdownVisible(false);
                console.log(closeMenu.current);
            }
                        
        };

        document.addEventListener("mousedown",handleGenreTagClick);

        return()=>{
            document.removeEventListener("mousedown", handleGenreTagClick);
        }
    })
    
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
                <div className="genre-container" ref={closeMenu}>
                    <div className="genre-tag" onClick={handleGenreTagClick}>
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
        </>
    );
}

export default Header;
