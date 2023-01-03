import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialPlacesState = [];


const placesSlice = createSlice({
    name: 'places',
    initialState: initialPlacesState,
    reducers: {
        getPlaces: (state, action) => {
            return [...action.payload];
        },
        addNewPlace: (state, action) => {
            state.push(action.payload)
        },
        updatePlace: (state, action) => {
            const index = state.findIndex(place => place.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload
            }
        },
        removePlace: (state, action) => {
            const index = state.findIndex(place => place.id === action.payload.id);
            state.splice(index, 1);
        }

    }

})

export const { getPlaces, addNewPlace, updatePlace, removePlace } = placesSlice.actions;


export default configureStore({
    reducer: { places: placesSlice.reducer }
})
