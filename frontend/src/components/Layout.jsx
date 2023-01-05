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
            backgroundPosition: 'center',
            backgroundImage: `url(${FrontIcon})`,
            minHeight: '100vh'
        }}>
            <div className="root">
                {/* appbar */}
                <AppBar
                    position='sticky'
                    elevation={0}
                    sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}
                >
                    <Toolbar onClick={() => {
                        navigate('/')
                        setTab(0)
                    }}
                    >
                        <LandscapeIcon
                            sx={{
                                color: red[900], '&:hover': {
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
                            Check before you go
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* menu */}
                <AppBar
                    elevation={20}
                    position='sticky'
                    sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}
                >
                    <Tabs value={tab} onChange={handleChangeTab} centered textColor='inherit' TabIndicatorProps={{ style: { background: red[900], height: 2 } }}>
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
                <>
                    {location.pathname != '/' && <div className='pages'>
                        {children}
                    </div>
                    }
                    {location.pathname == '/' && children}
                </>
            </div>
        </Box >

    )
}

export default Layout;