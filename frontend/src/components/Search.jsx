import React from 'react'

// mui
import { Typography, Button, TextField } from "@mui/material";


const customTextFieldStyle = {
    "& .MuiOutlinedInput-root": {
        "& > fieldset": { borderColor: 'primary.contrastText', borderRadius: 1 }
    },
    "& .MuiOutlinedInput-root:hover": {
        "& > fieldset": { borderColor: 'primary.contrastText' }
    },
    input: { color: 'primary.contrastText' }
}


export const Search = ({ title, lineHeight, size }) => {
    return (
        <>
            {title && (
                <Typography variant="h4" align="center" color='#fff' mb='30px' sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>)}
            <TextField
                color="text"
                sx={{
                    flexBasis: '80%', flexGrow: 1, lineHeight: { lineHeight }, ...customTextFieldStyle, pr: 1
                }}
                variant='outlined'
                size={size}
            />
            <Button
                variant="contained"
                sx={{ backgroundColor: 'secondary.main', flexBasis: '20%', flexGrow: 1, borderRadius: 1 }}
            >
                Search
            </Button>
        </>
    )
}

export default Search;
