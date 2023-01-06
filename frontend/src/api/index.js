// places
export const fetchPlaces = async () => {
    return await fetch('/api/places', {
        method: 'GET'
    })
}

export const createPlace = async (place) => {
    return await fetch('/api/places', {
        method: 'POST',
        body: place,
        headers: { 'Content-Type': 'application/json' }
    })
}

export const deletePlace = async (placeId) => {
    return await fetch(`/api/places/${placeId}`, {
        method: 'DELETE',
    })
}

export const updatePlace = async (placeId, place) => {
    return await fetch(`/api/places/${placeId}`, {
        method: 'PUT',
        body: place,
        headers: { 'Content-Type': 'application/json' }
    })
}

// movies

export const fetchMovies = async () => {
    return await fetch('/api/movies', {
        method: 'GET'
    })
}

export const createMovie = async (movie) => {
    return await fetch('/api/movies', {
        method: 'POST',
        body: movie,
        headers: { 'Content-Type': 'application/json' }
    })
}

export const deleteMovie = async (movieId) => {
    return await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE',
    })
}

export const updateMovie = async (movieId, movie) => {
    return await fetch(`/api/movies/${movieId}`, {
        method: 'PUT',
        body: movie,
        headers: { 'Content-Type': 'application/json' }
    })
}