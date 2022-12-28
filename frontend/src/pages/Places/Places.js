import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';

import { fetchPlaces, createPlace } from "../../api";
import { getPlaces, addNewPlace } from "../../store";

const Places = () => {

    const dispatch = useDispatch();
    const places = useSelector((state) => state.places)

    const [errors, setErrors] = useState(null);
    const [name, setName] = useState('');
    const [altitude, setAltitude] = useState('');


    useEffect(() => {
        const setPlaces = async () => {
            const response = await fetchPlaces();
            const json = await response.json();
            if (response.ok) {
                dispatch(getPlaces(json));
            }
        }
        setPlaces();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = []
        if (!name) {
            errors.push('name')
            setErrors(errors)
        }

        if (!altitude) {
            errors.push(altitude)
            setErrors(errors);
        }
        if (errors.length) return;

        const response = await createPlace({ name, altitude });
        const json = await response.json();
        if (response.ok) {
            dispatch(addNewPlace(json))
        }
    }

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
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Altitude:
                    <input type="number" name="altitude" value={altitude} onChange={(e) => setAltitude(e.target.value)} />
                </label>
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
            {errors && <div>'Please complete all fields'</div>}
        </div>


    )
}

export default Places;