// auth
export const signup = async (credentials) => {
    return await fetch('/api/signup', {
        method: 'POST',
        body: credentials,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const login = async (credentials) => {
    return await fetch('/api/login', {
        method: 'POST',
        body: credentials,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}


// places
export const fetchPlaces = async () => {
    return await fetch('/api/places', {
        method: 'GET',
    })
}

export const createPlace = async ({ token }, place) => {
    return await fetch('/api/places', {
        method: 'POST',
        body: place,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deletePlace = async ({ token }, placeId) => {
    return await fetch(`/api/places/${placeId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updatePlace = async ({ token }, placeId, place) => {
    return await fetch(`/api/places/${placeId}`, {
        method: 'PUT',
        body: place,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

// movies
export const fetchMovies = async () => {
    return await fetch('/api/movies', {
        method: 'GET',
    })
}

export const createMovie = async ({ token }, movie) => {
    return await fetch('/api/movies', {
        method: 'POST',
        body: movie,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const deleteMovie = async ({ token }, movieId) => {
    return await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateMovie = async ({ token }, movieId, movie) => {
    return await fetch(`/api/movies/${movieId}`, {
        method: 'PUT',
        body: movie,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}