import React, { useState } from 'react';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../api';
import { useAuthContext } from '../hooks/useAuthContext';
import useStorage from '../hooks/useStorage';

const LoginForm = ({ handleClose }) => {
    const { setUser } = useAuthContext();
    const { setItem } = useStorage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);

    const toastId = Math.random()

    const notify = (message) => {
        if (!toast.isActive(toastId)) {
            toast(message, {
                toastId
            })
        }
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
        if (errors.includes('email')) {
            const index = errors.indexOf('email');
            errors.splice(index, 1);
        }
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
        if (errors.includes('password')) {
            const index = errors.indexOf('password');
            errors.splice(index, 1);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];

        if (!email) {
            errors.push('email');
            setErrors(errors);
        }

        if (!password) {
            errors.push('password');
            setPassword(errors);
        }

        if (!errors.length) {
            const payload = JSON.stringify({
                email, password
            })
            const response = await login(payload);
            const json = await response.json();

            if (!response.ok) {
                notify(json.message)
            }

            if (response.ok) {
                setUser(json.token);
                setItem('user', json.token);
                handleClose();
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
                        Log in
                    </Typography>
                </Grid>

                <Grid item xs={10} >
                    <TextField
                        sx={customTextFieldStyle}
                        InputLabelProps={{ color: 'warning' }}
                        color="secondary"
                        name="email"
                        fullWidth
                        required
                        id="email"
                        label="Email"
                        value={email}
                        onChange={changeEmail}
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
                        id="password"
                        label="Password"
                        name="password"
                        value={password}
                        onChange={changePassword}
                    />
                </Grid>
                <Grid item xs={10} sx={{ display: "flex", justifyContent: 'flex-end' }}>
                    <Button
                        color='secondary'
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid >
        </Box >
    )
}

export default LoginForm;