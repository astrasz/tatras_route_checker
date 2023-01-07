import { createSlice } from "@reduxjs/toolkit";

const initialMoviesState = [];


export const moviesSlice = createSlice({
    name: 'movies',
    initialState: initialMoviesState,
    reducers: {
        getMovies: (state, action) => {
            return [...action.payload];
        },
        addNewMovie: (state, action) => {
            state.push(action.payload)
        },
        updateMovie: (state, action) => {
            const index = state.findIndex(movie => movie.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload
            }
        },
        removeMovie: (state, action) => {
            const index = state.findIndex(movie => movie.id === action.payload.id);
            state.splice(index, 1);
        }
    }
})

export const selectAllMovies = state => state.movies;

export const selectMovieById = (state, movieId) => state.movies.find((movie) => movie.id === +movieId);

export const { getMovies, addNewMovie, updateMovie, removeMovie } = moviesSlice.actions;