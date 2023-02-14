import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { createPlace } from "../api";
import { addNewPlace } from "../store/slices/placesSlice";


const PlaceForm = () => {

    const [name, setName] = useState('');
    const [altitude, setAltitude] = useState('');
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

    const changeName = (e) => {
        setName(e.target.value);
        if (errors.includes('name')) {
            const index = errors.indexOf('name');
            errors.splice(index, 1);
        }
    }

    const changeAltitude = (e) => {
        setAltitude(e.target.value);
        if (errors.includes('altitude')) {
            const index = errors.indexOf('altitude');
            errors.splice(index, 1);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = []
        if (!name) {
            errors.push('name')
            setErrors(errors)
        }

        if (!altitude) {
            errors.push("altitude")
            setErrors(errors);
        }

        if (errors.length) {
            return notify('Please fill all fields');
        }

        if (!errors.length) {
            const payload = JSON.stringify({ name, altitude: +altitude })
            const response = await createPlace(payload);
            const json = await response.json();

            if (response.ok) {
                dispatch(addNewPlace(json));
                setName('');
                setAltitude('');
            }
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
        input: { color: 'primary.contrastText' }
    }

    return (

        < Box component="form" noValidate autoComplete="false" onSubmit={handleSubmit} sx={{ bgcolor: 'background.paper', color: 'primary.contrastText' }} >
            <ToastContainer
                position="bottom-left"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Grid container item xs={12} spacing={2} justifyContent='center'>
                <Grid item xs={10} sx={{ mt: 3 }}>
                    <Typography variant="h6">
                        Add new place
                    </Typography>
                </Grid>

                <Grid item xs={10} >
                    <TextField
                        sx={customTextFieldStyle}
                        InputLabelProps={{ color: 'warning' }}
                        color="secondary"
                        name="name"
                        fullWidth
                        required
                        id="name"
                        label="Name"
                        value={name}
                        onChange={changeName}
                        error={errors && errors.includes('name')}
                    />
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        sx={customTextFieldStyle}
                        InputLabelProps={{ color: 'warning' }}
                        color="secondary"
                        required
                        fullWidth
                        id="altitude"
                        label="Altitude"
                        name="altitude"
                        value={altitude}
                        onChange={changeAltitude}
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

export default PlaceForm;
