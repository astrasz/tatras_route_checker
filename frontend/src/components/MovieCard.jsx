import React from 'react'

// mui
import { Card, CardHeader, CardMedia, IconButton, Typography, Avatar, CardActions } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageIcon from '@mui/icons-material/Message';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';



const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    const movieId = movie.linkToFile.split("v=")[1].substring(0, 11);
    const difficultyLetter = movie.difficulty.substring(0, 1).toUpperCase()

    let avatarBackgroudColor = 'info.main';

    switch (difficultyLetter) {
        case 'H':
            avatarBackgroudColor = 'background.default';
            break;
        case 'N':
            avatarBackgroudColor = 'warning.light';
            break;
        case 'E':
            avatarBackgroudColor = 'success.light';
            break;

        default:
            avatarBackgroudColor = 'info.main'
            break;
    }


    return (
        <Card sx={{ maxWidth: 280, bgcolor: 'transparent', color: 'primary.contrastText', border: 'none', boxShadow: 'none' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: avatarBackgroudColor, color: 'inherit' }} aria-label="recipe">
                        {difficultyLetter}
                    </Avatar>
                }
                action={
                    <IconButton color="inherit" onClick={() => console.log(movie.id)}>
                        <DeleteIcon />
                    </IconButton>
                }
                title={movie.title}
            />
            <CardMedia
                component="img"
                height="194"
                image={'http://img.youtube.com/vi/' + movieId + '/hqdefault.jpg'}
                alt="Paella dish"
                sx={{ '&:hover': { cursor: 'pointer' } }}
                onClick={() => navigate(`/movies/${movie.id}`)}
            />
            <CardActions disableSpacing color='inherit' sx={{ border: 'none', justifyContent: 'space-between', backgroundColor: 'background.default' }} >
                <Box display='flex'>
                    <FavoriteIcon sx={{ color: 'secondary.main' }} />
                    <Typography color='primary.contrastText' pl={1}>10</Typography>
                </Box>
                <Box display='flex'>
                    <MessageIcon sx={{ color: 'secondary.main' }} />
                    <Typography color='primary.contrastText' pl={1}> 10</Typography>
                </Box>

                <IconButton aria-label="add to favorites" color='inherit'>
                    <FavoriteBorderIcon />
                </IconButton>
                <IconButton aria-label="share" color='inherit'>
                    <ChatBubbleOutlineIcon />
                </IconButton>
            </CardActions>
        </Card >
    )
}

export default MovieCard;