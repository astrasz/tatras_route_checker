import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Places from './pages/Places';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/places'
              element={<Places />}
            />
          </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
