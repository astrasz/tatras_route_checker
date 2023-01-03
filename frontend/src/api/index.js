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