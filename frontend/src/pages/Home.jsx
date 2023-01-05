// mui
import { Typography, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";




const Home = () => {
    const customTextFieldStyle = {
        "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: 'primary.contrastText', borderRadius: 1 }
        },
        "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": { borderColor: 'primary.contrastText' }
        },
        input: { color: 'primary.contrastText' }
    }

    return (
        <Box
            sx={{
                width: { xs: 400, md: 700, lg: 900 },
                m: 'auto',
                position: "absolute",
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexWrap: 'wrap',
            }}
        >
            <Typography variant="h4" align="center" color='#fff' mb='30px' sx={{ flexGrow: 1 }}>
                Find a new awesome trail!
            </Typography>
            <TextField
                color="text"
                sx={{
                    flexBasis: '80%', flexGrow: 1, lineHeight: '25px', ...customTextFieldStyle, pr: 1
                }}
                variant='outlined'
            />
            <Button
                variant="contained"
                sx={{ backgroundColor: 'secondary.main', flexBasis: '20%', flexGrow: 1, borderRadius: 1 }}
            >
                Search
            </Button>
        </Box >
    )
}

export default Home;