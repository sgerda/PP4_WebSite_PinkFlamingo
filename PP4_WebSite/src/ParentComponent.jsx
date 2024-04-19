import React, { useState } from 'react';
import FetGenreList from './FetGenreList';
import MovieFetch from './MovieFetch';

const AuthToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjA2MDkwNDk1M2M5ODE5ZDViYmJjOTAyODVkYjkwZCIsInN1YiI6IjY1ZmRkMjk1N2Y2YzhkMDE2MzZkY2I5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jr9alQFOXm7mSGJwMRoAu2bgjOYRO1pmpugB2xK96X8';

const ParentComponent = ({prop}) => {
    const {genreIds} = prop;

    // return(<MovieFetch prop={{genreIds: genreIds}}/>);
};

export default ParentComponent;