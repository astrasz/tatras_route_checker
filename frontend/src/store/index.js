import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialPlacesState = [];


const placesSlice = createSlice({
    name: 'places',
    initialState: initialPlacesState,
    reducers: {
        getPlaces: (state, action) => {
            state = action.payload;
        },
        addNewPlace: (state, action) => {
            return [...state, action.payload]
        },
        updatePlace: (state, action) => {
            state.map(place => {
                if (place.id === action.payload.id) {
                    return { ...place, ...action.payload }
                }
                return place;
            })
        },
        removePlace: (state, action) => {
            state.filter(place => place.id !== action.payload.id);
        }

    }

})

export const { getPlaces, addNewPlace, updatePlace, removePlace } = placesSlice.actions;


export default configureStore({
    reducer: { places: placesSlice.reducer }
})
