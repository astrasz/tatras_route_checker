import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


// mui
import PlaceIcon from '@mui/icons-material/Place';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LandscapeIcon from '@mui/icons-material/Landscape';
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { blue, pink } from '@mui/material/colors';
import { Box } from '@mui/system';


const LinkTab = (props) => {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}


const Layout = ({ children }) => {

    const navigate = useNavigate()
    const [tab, setTab] = useState(0);

    const handleChangeTab = (event, tab) => {
        setTab(tab);
    };


    const menuItems = [
        {
            text: 'PLACES',
            path: '/places'
        },
        {
            text: 'MOVIES',
            path: '/movies'
        }
    ]

    const accentColor = blue[100]

    // '#f50057'
    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <div className="root">
                {/* appbar */}
                <AppBar
                    position='sticky'
                    color='primary'
                    elevation={0}
                >
                    <Toolbar onClick={() => {
                        navigate('/')
                        setTab(0)
                    }}
                    >
                        <LandscapeIcon
                            sx={{
                                color: accentColor, '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                            fontSize='large'
                        />
                        <Typography variant='h5' component='a' sx={{
                            marginLeft: 1, flexGrow: 1, '&:hover': {
                                cursor: 'pointer'
                            }
                        }}>
                            Tatras Route Checker
                        </Typography>
                        <Typography>
                            Check before you go!
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* menu */}
                <AppBar
                    elevation={5}
                    position='sticky'
                    color='primary'
                >
                    <Tabs value={tab} onChange={handleChangeTab} centered textColor='inherit' TabIndicatorProps={{ style: { background: 'info' } }}>
                        <Tab icon={<LandscapeIcon />} aria-label="landscape" onClick={() => navigate('/')} />
                        {menuItems.map((item) => (
                            <LinkTab
                                key={item.text}
                                onClick={() => navigate(item.path)}
                                label={item.text}
                            >
                            </LinkTab>
                        ))}
                    </Tabs>
                </AppBar>

                {/* content */}
                <div className='page'>
                    {children}
                </div>
            </div>
        </Box >

    )
}

export default Layout;