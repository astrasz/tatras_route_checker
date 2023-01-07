import { configureStore } from '@reduxjs/toolkit';
import { placesSlice } from './slices/placesSlice';
import { moviesSlice } from './slices/moviesSlice';


export default configureStore({
    reducer: {
        places: placesSlice.reducer,
        movies: moviesSlice.reducer
    }
})
