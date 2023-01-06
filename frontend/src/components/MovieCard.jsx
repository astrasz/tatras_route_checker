import React from 'react'

// mui
import { Card, CardHeader, CardMedia, IconButton, CardContent, Typography } from '@mui/material'


const MovieCard = ({ movie }) => {


    console.log('movie', movie.linkToFile);

    // + 'modestbranding=0&autohide=1&showinfo=0&controls=0'
    //  '?rel=0&amp;fs=0&amp;showinfo=0;controls=0;'

    let movieId = movie.linkToFile.split("v=")[1].substring(0, 11);
    console.log(movieId);

    return (
        <div>
            <Card
            >

                <CardMedia
                    component='img'
                    width='100%'
                    height='100px'
                    // height='315px'
                    // sx={{
                    //     display: "flex", marginLeft: "auto",
                    //     marginRight: "auto"
                    // }}
                    // height="150"
                    src={'http://img.youtube.com/vi/' + movieId + '/hqdefault.jpg'}
                // objectFit='cover'
                // title={movie.title}
                // frameborder="0"
                // sx={{ mt: -12 }}
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                // allow="autoPlay"
                // autoPlay
                // muted
                />
                <CardHeader>

                </CardHeader>
                <CardContent>
                    <Typography>Jak to bedze wyglądać?</Typography>
                </CardContent>
            </Card>

        </div>
    )
}

export default MovieCard;