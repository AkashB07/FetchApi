import React, { useRef } from "react";
import classes from "./MovieForm.module.css";

const MovieForm = (props) => {
    const movieTitleRef = useRef();
    const movieOpeningRef = useRef();
    const movieDateRef = useRef();

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const movieTitle = movieTitleRef.current.value;
        const movieOpening = movieOpeningRef.current.value;
        const movieDate = movieDateRef.current.value;

        const NewMovieObj = {
            title: movieTitle,
            openingText: movieOpening,
            releaseDate: movieDate,
        };

        props.onAddMovie(NewMovieObj);
    };
    return (
        <div className={classes.movieform}>
            <form onSubmit={onSubmitHandler}>
                <div className={classes.coloum}>
                    <div><label htmlFor="movie">Title</label></div>
                    <input
                        id="movie"
                        type="text"
                        ref={movieTitleRef}
                        className={classes.input}
                    ></input>
                </div>
                <div className={classes.coloum}>
                    <div><label htmlFor="opening">Opening Text</label></div>
                    <input
                        id="openingtext"
                        type="text"
                        ref={movieOpeningRef}
                        className={classes.input}
                    ></input>
                </div>
                <div className={classes.coloum}>
                    <div><label htmlFor="Date">Release Date</label></div>
                    <input
                        id="date"
                        type="date"
                        ref={movieDateRef}
                        className={classes.input}
                    ></input>
                </div>
                <button className={classes.formBtn} type="submit">
                    Add Movie
                </button>
            </form>
        </div>
    );
};

export default MovieForm;