import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { selectMovieById } from '../store/slices/moviesSlice';


// mui
import { Typography, Card, CardHeader, CardContent, CardMedia, IconButton, Stack } from "@mui/material";
import { Container } from "@mui/system";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MovieDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const movie = useSelector(state => selectMovieById(state, id))
    const movieId = movie ? movie.linkToFile.split("v=")[1].substring(0, 11) : null;

    return (
        <Container>
            {movie && (
                <Card sx={{
                    maxHeight: '70vh', overflowY: 'scroll', color: 'primary.contrastText', '&::-webkit-scrollbar': {
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
                    <CardMedia
                        component="iframe"
                        height="400px"
                        src={'https://youtube.com/embed/' + movieId + '?version=3&amp;rel=0&autoplay=1;'}
                        alt={movie.title}
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                        frameborder="0"
                        allowFullScreen
                    />
                    <CardHeader
                        action={
                            <>
                                <IconButton color="inherit" onClick={() => console.log(movie.id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="inherit" onClick={() => console.log(movie.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                        title={movie.title}
                    // subheader={movie.createdAt}
                    />
                    <CardContent>
                        <Typography>{movie.description}</Typography>
                        <Stack spacing={2} mt={5}>
                            <Typography variant='p'>
                                Comment 1
                            </Typography>
                            <Typography variant='p'>
                                Comment 2
                            </Typography>
                            <Typography variant='p'>
                                Comment 3
                            </Typography>
                        </Stack>

                    </CardContent>

                </Card>
            )
            }
        </Container >
    )
}

export default MovieDetails