// mui
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteMovie, fetchMovies } from "../api";
import { getMovies, removeMovie } from "../store/slices/moviesSlice";

// components & pages
import MovieCard from "../components/MovieCard";


const Movies = () => {


    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies);

    const [isLoading, setIsLoading] = useState(true);

    // TO DO: handling errors from backend
    const handleDelete = async (id) => {
        const response = await deleteMovie(id);
        const json = await response.json();

        if (response.ok) {
            dispatch(removeMovie(id))
        }
    }

    useEffect(() => {
        const setMovies = async () => {
            const response = await fetchMovies();
            const json = await response.json();

            if (response.ok) {
                dispatch(getMovies(json));
                setIsLoading(false);
            }
        }
        setMovies();
    }, [])

    return (
        <Container>
            <Grid container spacing={2}>
                {movies.map(movie => (
                    <>
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <MovieCard movie={movie} />
                        </ Grid>
                        {/* <Grid item xs={12} md={6} lg={4}>
                            <MovieCard movie={movie} />
                        </ Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MovieCard movie={movie} />
                        </ Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MovieCard movie={movie} />
                        </ Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MovieCard movie={movie} />
                        </ Grid> */}
                    </>
                ))}

            </Grid>
        </Container>
    )
}

export default Movies;