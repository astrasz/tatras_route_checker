import { useState, useEffect, Fragment } from "react"
import { useSelector, useDispatch } from 'react-redux';

import { fetchPlaces, deletePlace } from "../api";
import { getPlaces, removePlace } from "../store/slices/placesSlice";

// mui
import { Container } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography, LinearProgress } from "@mui/material";


// components & pages
import PlaceForm from "../components/PlaceForm";


const Places = () => {

    const dispatch = useDispatch();
    const places = useSelector((state) => state.places)

    const [isLoading, setIsLoading] = useState(true);

    // TO DO: handling errors from backend
    const handleDelete = async (id) => {
        const response = await deletePlace(id);
        const json = await response.json();

        if (response.ok) {
            dispatch(removePlace(id))
        }
    }

    useEffect(() => {
        const setPlaces = async () => {
            const response = await fetchPlaces();
            const json = await response.json();

            if (response.ok) {
                dispatch(getPlaces(json));
                setIsLoading(false);
            }
        }
        setPlaces();
    }, [])


    return (

        <Container>
            <Grid container spacing={2}>
                <Grid container item xs={12} sm={8} md={7}>
                    <PlaceForm />
                </Grid>

                <Grid container item xs={12} sm={8} md={5}>

                    <Grid item xs={12}>
                        {!isLoading && (
                            <List sx={{ width: '100%', color: "primary.contrastText", bgcolor: 'background.paper' }}>
                                {places && !isLoading && places.map(place => (
                                    <Fragment key={place.id}>
                                        <ListItem >
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'info.main', color: 'inherit' }} variant='square'>H</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={place.name}
                                                secondary={
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                    >
                                                        {place.altitude}
                                                    </Typography>

                                                }
                                            />
                                            <IconButton color="inherit" onClick={() => console.log(place.id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="inherit" onClick={() => handleDelete(place.id)}>
                                                <DeleteIcon />
                                            </IconButton>

                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </Fragment>
                                ))}
                            </List>
                        )}
                        {isLoading && (
                            <LinearProgress color="secondary" />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}

export default Places;