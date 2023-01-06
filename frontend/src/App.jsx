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



const theme = createTheme({
  palette: {
    // mode: 'dark',
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
      main: red[900]
    }
  },
  typography: {
    fontFamily: 'Mukta',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  customColors: {
    accent: pink['A400']
  }
})

function App() {
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
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
