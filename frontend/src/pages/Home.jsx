// mui
import { Box } from "@mui/system";

// pages & components
import Search from "../components/Search";

const Home = () => {
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
            <Search title='Find a new awaesome trail!' lineHeigth='25px' />
        </Box>
    )
}

export default Home;