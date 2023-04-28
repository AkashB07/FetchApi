import React, { Fragment } from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <Fragment>
      <li className={classes.movie}>
        <h2>{props.title}</h2>
        <h3>{props.releaseDate}</h3>
        <p>{props.openingText}</p>
      </li>
      <button onClick={() => props.deletingMovie(props.movieId)}>Delete Movie</button><br/><br/>
    </Fragment>

  );
};

export default Movie;
