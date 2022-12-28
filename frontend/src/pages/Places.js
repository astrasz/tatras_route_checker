import { useState, useEffect } from "react"

const Places = () => {
    const [errors, setErrors] = useState(null);
    const [places, setPlaces] = useState(null);


    useEffect(() => {
        const fetchPlaces = async () => {
            const response = await fetch('/api/places')
            const json = await response.json();
            if (response.ok) {
                setPlaces(json);
            }
        }
        fetchPlaces()
    }, [])

    return (

        <div className="places">
            <div className="places__list">
                {places && places.map(place => (
                    <p key={place.id}>{place.name}</p>
                ))}
            </div>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <label>
                    Altitude:
                    <input type="number" name="altitude" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>


    )
}

export default Places;