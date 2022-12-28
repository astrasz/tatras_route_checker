export const fetchPlaces = async () => {
    return await fetch('/api/places', {
        method: 'GET'
    })
}

export const createPlace = async (payload) => {
    return await fetch('/api/places', {
        method: 'POST',
        body: payload
    })
}