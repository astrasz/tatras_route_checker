import { deleteMovie } from "../api";
import { removeMovie } from "../store/slices/moviesSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// mui
import { Grid, Button, Stack } from "@mui/material";
import { Container } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';

// components & pages
import MovieCard from "../components/MovieCard";
import Search from "../components/Search";
import ModalBox from "../components/ModalBox";
import MovieForm from "../components/MovieForm";
import { useAuthContext } from "../hooks/useAuthContext";



const Movies = () => {

    const { user } = useAuthContext();
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies);
    const places = useSelector(state => state.places)

    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // TO DO: handling errors from backend
    const handleDelete = async (id) => {
        const response = await deleteMovie(id);
        const json = await response.json();

        if (response.ok) {
            dispatch(removeMovie(id))
        }
    }



    useEffect(() => {
        if (movies.length) {
            setIsLoading(false);
        }
    }, [movies])

    return (
        <Container>
            <Stack flexDirection='row' justifyContent='space-between' sx={{ pb: 5, pt: 5 }}>
                <Box
                    sx={{
                        width: { xs: 400, md: 400, lg: 600 },
                        display: 'flex',
                        flexWrap: 'no wrap',
                    }}
                >
                    <Search lineHeight='15px' size='small' />
                </Box>
                {!!user && <Button onClick={handleOpen} variant="contained" endIcon={<AddIcon />} sx={{
                    backgroundColor: "secondary.main"
                }}>ADD</Button>}
            </Stack>
            <ModalBox
                open={open}
                handleClose={handleClose}
            >
                <MovieForm places={places} />
            </ ModalBox>

            <Grid container spacing={4} sx={{
                maxHeight: '55vh', overflow: 'scroll',
                '&::-webkit-scrollbar': {
                    width: '0.4em',
                },
                '&::-webkit-scrollbar-track': {
                    background: "transparent",
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#777',
                    borderRadius: "10px"

                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555'
                },
                '&::-webkit-scrollbar-corner': {
                    background: 'rgba(0, 0, 0, 0)'
                }
            }}>
                {movies.map(movie => (
                    <Grid item xs={12} sm={8} md={6} lg={4} key={movie.id}>
                        <MovieCard movie={movie} />
                    </ Grid>
                ))}

            </Grid>
        </ Container>
    )
}

export default Movies;