import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from '@mui/system';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { createMovie } from '../api';
import { useDispatch } from 'react-redux';
import { addNewMovie } from '../store/slices/moviesSlice';



const MovieForm = ({ places }) => {
    const [startPointId, setStartPointId] = useState('');
    const [endPointId, setEndPointId] = useState('');
    const [destinationId, setDestinationId] = useState('');
    const [linkToFile, setLinkToFile] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [title, setTitle] = useState('');
    const [isWinter, setIsWinter] = useState(false);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState(null);

    const dispatch = useDispatch();
    const toastId = Math.random()

    const notify = (message) => {
        if (!toast.isActive(toastId)) {
            toast(message, {
                toastId
            })
        }
    }

    const changeStartPointId = (e) => {
        setStartPointId(e.target.value);
        if (errors.includes('startPointId')) {
            const index = errors.indexOf('startPointId');
            errors.splice(index, 1);
        }
    }
    const changeLinkToFile = (e) => {
        setLinkToFile(e.target.value);
        if (errors.includes('linkToFile')) {
            const index = errors.indexOf('linkToFIle');
            errors.splice(index, 1);
        }
    }
    const changeDifficulty = (e) => {
        setDifficulty(e.target.value);
        if (errors.includes('difficulty')) {
            const index = errors.indexOf('difficulty');
            errors.splice(index, 1);
        }
    }
    const changeTitle = (e) => {
        setTitle(e.target.value);
        if (errors.includes('title')) {
            const index = errors.indexOf('title');
            errors.splice(index, 1);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];
        if (!startPointId) {
            errors.push('startPointId')
            setErrors(errors);
        }
        if (!linkToFile) {
            errors.push('linkToFile')
            setErrors(errors);
        }
        if (!difficulty) {
            errors.push('difficulty')
            setErrors(errors);
        }
        if (!title) {
            errors.push('title')
            setErrors(errors);
        }
        if (errors.length) {
            // return notify('Please fill required fields');
            return;
        }

        const payload = JSON.stringify({
            startPointId,
            endPointId,
            destinationId,
            linkToFile,
            difficulty,
            title,
            isWinter,
            description
        })

        const response = await createMovie(payload);
        const json = await response.json();

        if (response.ok) {
            dispatch(addNewMovie(json))
            setStartPointId('');
            setEndPointId('');
            setDestinationId('');
            setLinkToFile('');
            setDifficulty('');
            setTitle('');
            setIsWinter(false);
            setDescription('');
        }

    }

    const customTextFieldStyle = {
        "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: 'primary.main' }
        },
        "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": { borderColor: 'secondary.main' }
        },
        label: { color: 'rgba(211,211,211, 0.6)' },
        input: { color: 'primary.contrastText' },
    }

    const customFormControlStyle = {
        "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: 'primary.main' },
            color: 'primary.contrastText'
        },
        "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": { borderColor: 'secondary.main' },
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "secondary.main"
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(211,211,211, 0.6)'
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#f57c00'
        },
        '& .MuiSelect-icon': {
            color: 'primary.contrastText'
        },

    }
    const difficulties = ['easy', 'normal', 'hard'];

    return (
        <Box component="form" noValidate autoComplete="false" onSubmit={handleSubmit} sx={{ bgcolor: 'background.paper', color: 'primary.contrastText', height: 'inherit' }} >
            {/* <ToastContainer
                position="top-left"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            /> */}
            <Grid container item xs={12} spacing={2} justifyContent='center'>
                <Grid item xs={10} sx={{ mt: 3 }}>
                    <Typography variant="h6">
                        Add new video
                    </Typography>
                </Grid>

                <Grid item xs={10}>
                    <FormControl required sx={{ m: 1, minWidth: 150, ...customFormControlStyle }}>
                        <InputLabel id="start-point">Start point</InputLabel>
                        <Select
                            MenuProps={{
                                sx: {
                                    '& .MuiMenuItem-root': {
                                        color: 'primary.contrastText'
                                    },
                                },
                            }}
                            labelId="start-point-label"
                            id="start-point-select"
                            value={startPointId}
                            label="Start point *"
                            onChange={changeStartPointId}
                            error={errors && errors.includes('startPointId')}
                        >
                            <MenuItem key='#' value=''>None</MenuItem>
                            {places && places.map(place => (
                                <MenuItem
                                    key={places.id} value={place.id}>{place.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={10} >
                    <FormControl sx={{ m: 1, minWidth: 150, ...customFormControlStyle }}>
                        <InputLabel id="end-point">Destination</InputLabel>
                        <Select
                            MenuProps={{
                                sx: {
                                    '& .MuiMenuItem-root': {
                                        color: 'primary.contrastText'
                                    },
                                },
                            }}
                            labelId="end-point-label"
                            id="end-point-select"
                            value={destinationId}
                            label="Destination"
                            onChange={(e) => setDestinationId(e.target.value)}
                        >
                            <MenuItem key='#' value=''>None</MenuItem>
                            {places && places.map(place => (
                                <MenuItem key={places.id} value={place.id}>{place.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={10} >
                    <FormControl sx={{ m: 1, minWidth: 150, ...customFormControlStyle }}>
                        <InputLabel id="destination">End point</InputLabel>
                        <Select
                            MenuProps={{
                                sx: {
                                    '& .MuiMenuItem-root': {
                                        color: 'primary.contrastText'
                                    },
                                },
                            }}
                            labelId="destination-label"
                            id="destination-select"
                            value={endPointId}
                            label="End point *"
                            onChange={(e) => setEndPointId(e.target.value)}
                        >
                            <MenuItem key='#' value=''>None</MenuItem>
                            {places && places.map(place => (
                                <MenuItem key={places.id} value={place.id}>{place.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={10} >
                    <FormControl required sx={{ m: 1, minWidth: 150, ...customFormControlStyle }}>
                        <InputLabel id="difficulty">Difficulty</InputLabel>
                        <Select
                            MenuProps={{
                                sx: {
                                    '& .MuiMenuItem-root': {
                                        color: 'primary.contrastText'
                                    },
                                },
                            }}
                            labelId="difficulty-label"
                            id="difficulty-select"
                            value={difficulty}
                            label="Difficulty *"
                            onChange={changeDifficulty}
                            error={errors && errors.includes('difficulty')}
                        >
                            {difficulties && difficulties.map(difficulty => (
                                <MenuItem key={difficulty} value={difficulty}>{difficulty}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={10} >
                    <FormControl component="fieldset" variant="standard">
                        <FormControlLabel
                            control={
                                <Switch checked={isWinter} onChange={() => setIsWinter(!isWinter)} name="isWinter" />
                            }
                            label="Is winter?"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        sx={customTextFieldStyle}
                        InputLabelProps={{ color: 'warning' }}
                        color="secondary"
                        required
                        fullWidth
                        id="linkToFile"
                        label="Video link"
                        name="linkToFile"
                        value={linkToFile}
                        onChange={changeLinkToFile}
                        error={errors && errors.includes('linkToFile')}
                    />
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        sx={customTextFieldStyle}
                        InputLabelProps={{ color: 'warning' }}
                        color="secondary"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={title}
                        onChange={changeTitle}
                        error={errors && errors.includes('title')}
                    />
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        sx={customTextFieldStyle}
                        InputLabelProps={{ color: 'warning' }}
                        InputProps={{ sx: { '& :focus': { color: 'primary.contrastText' } } }}
                        color="secondary"
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}

                    />
                </Grid>
                <Grid item xs={10} sx={{ display: "flex", justifyContent: 'flex-end' }}>
                    <Button
                        color='secondary'
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid >
        </Box >
    )
}

export default MovieForm;