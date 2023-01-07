import { BrowserRouter, Routes, Route } from 'react-router-dom';

// mui
import { ThemeProvider, Box } from '@mui/material'
import { createTheme } from '@mui/material/styles';

// pages & components
import Home from './pages/Home';
import Places from './pages/Places';
import Movies from './pages/Movies';
import Layout from './components/Layout';
import { pink, red } from '@mui/material/colors';
import MovieDetails from './pages/MovieDetails';
import { fetchMovies, fetchPlaces } from './api';
import { getMovies } from './store/slices/moviesSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPlaces } from './store/slices/placesSlice';



const theme = createTheme({
  palette: {
    // mode: 'light',
    primary: {
      main: '#5893df',
    },
    secondary: {
      main: '#2ec5d3',
    },
    background: {
      default: '#192231',
      paper: '#24344d',
    },
    info: {
      // main: red[900]
      main: '#d32f2f'
    }
  },
  typography: {
    fontFamily: 'Mukta',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  }
})

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const setMovies = async () => {
      const response = await fetchMovies();
      const json = await response.json();

      if (response.ok) {
        dispatch(getMovies(json));
        // setIsLoading(false);
      }
    }

    const setPlaces = async () => {
      const response = await fetchPlaces();
      const json = await response.json();

      if (response.ok) {
        dispatch(getPlaces(json));
        // setIsLoading(false);
      }
    }


    setPlaces();
    setMovies();
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          {/* <Navbar /> */}
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/places'
              element={<Places />}
            />
            <Route
              path='/movies'
              element={<Movies />}
            />
            <Route
              path='/movies/:id'
              element={<MovieDetails />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
