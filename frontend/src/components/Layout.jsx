import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// mui
import LandscapeIcon from '@mui/icons-material/Landscape';
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';

// components & pages
import FrontIcon from '../assets/images/front-icon.png'


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

    const navigate = useNavigate();
    const location = useLocation();
    const [tab, setTab] = useState(0);



    useEffect(() => {

        const currentPath = location.pathname;

        switch (currentPath) {
            case '/':
                setTab(0);
                break;
            case '/places':
                setTab(1);
                break;
            case '/movies':
                setTab(2);
                break;
            default:
                break;
        }

    }, [location.pathname])


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

    return (
        <Box sx={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${FrontIcon})`,
            backgroundAttachment: "fixed",
            height: '100vh',
            overflow: "hidden"

        }}>
            <div className="root">
                {/* appbar */}
                <AppBar
                    position='sticky'
                    elevation={20}
                    sx={{ bgcolor: 'rgba(0, 0, 0, 0.3)' }}
                >
                    <Toolbar
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Box
                            onClick={() => {
                                navigate('/')
                                setTab(0)
                            }}
                            display='flex'
                        >
                            <LandscapeIcon
                                sx={{
                                    color: red[900], '&:hover': {
                                        cursor: 'pointer'
                                    },
                                }}
                                fontSize='large'

                            />
                            <Typography variant='h5' component='a' sx={{
                                marginLeft: 1, flexGrow: 0, '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                            >
                                Tatras Route Checker
                            </Typography>
                        </Box>
                        <Tabs value={tab} onChange={handleChangeTab} centered textColor='inherit' TabIndicatorProps={{ style: { background: red[900], height: 2 } }}>
                            <Tab icon={<LandscapeIcon />} aria-label="landscape" onClick={() => navigate('/')} />
                            {menuItems.map((item) => (
                                <LinkTab
                                    key={item.text}
                                    onClick={() => { navigate(`..${item.path}`, { replace: true }) }}
                                    label={item.text}
                                >
                                </LinkTab>
                            ))}
                        </Tabs>
                        <Box>
                            <Typography>
                                Check before you go
                            </Typography>
                        </Box>
                    </Toolbar>

                </AppBar>

                {/* content */}
                <>
                    {location.pathname !== '/' && <div className='pages'>
                        {children}
                    </div>
                    }
                    {location.pathname === '/' && children}
                </>
            </div>
            {/* <footer> This is footer, which should be done!</footer> */}
        </Box >

    )
}

export default Layout;