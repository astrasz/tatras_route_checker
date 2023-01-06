import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from 'react-redux';


import { createPlace } from "../api";
import { addNewPlace } from "../store/slices/placesSlice";


const PlaceForm = () => {

    const [name, setName] = useState('');
    const [altitude, setAltitude] = useState('');
    const [errors, setErrors] = useState(null);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = []
        if (!name) {
            errors.push('name')
            setErrors(errors)
        }

        if (!altitude) {
            errors.push(altitude)
            setErrors(errors);
        }
        if (errors.length) return;

        const payload = JSON.stringify({ name, altitude: +altitude })
        const response = await createPlace(payload);
        const json = await response.json();

        if (response.ok) {
            dispatch(addNewPlace(json));
            setName('');
            setAltitude('');
        }
    }

    const customTextFieldStyle = {
        "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: 'primary.main' }
        },
        "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": { borderColor: 'secondary.main' }
        },
        label: { color: 'grey.100' },
        input: { color: 'primary.contrastText' }
    }

    return (

        < Box component="form" noValidate autoComplete="false" onSubmit={handleSubmit} sx={{ bgcolor: 'background.paper', color: 'primary.contrastText' }} >
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


// {/* <div>
//             <form>
//                 <label>
//                     Name:
//                     <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
//                 </label>
//                 <label>
//                     Altitude:
//                     <input type="number" name="altitude" value={altitude} onChange={(e) => setAltitude(e.target.value)} />
//                 </label>
//                 <input type="submit" value="Submit" onClick={handleSubmit} />
//             </form>
//             {errors && <div>'Please complete all fields'</div>}
//         </div> */}
