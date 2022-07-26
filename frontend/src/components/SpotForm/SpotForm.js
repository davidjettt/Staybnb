import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { createSpotThunk } from '../../store/spots';



export default function SpotForm({ spot, formType }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ address, setAddress ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ lat, setLat ] = useState('');
    const [ lng, setLng ] = useState('');
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        // const newSpot = {
        //     address,
        //     city,
        //     state,
        //     country,
        //     lat,
        //     lng,
        //     name,
        //     description,
        //     price
        // }

        spot = {
            ...spot,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        const spotData = await dispatch(createSpotThunk(spot)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );

        // console.log('NEW SPOT DATA', spotData)
        history.push(`/spots/${spotData.id}`)
    };

    return (
        <>
            <div className="create-spot-form-container">
                <div className="create-spot-form-pane">
                    <div className="create-spot-form-title-container">
                        <h3 className='create-spot-form-title'>Create a New Spot</h3>
                    </div>
                    <form className='create-spot-form' onSubmit={handleSubmit}>
                        <div className='errors'>
                            <ul className="errors-list">
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                        </div>
                        <div className='input-container-main'>
                            <div className='input-container-sub'>
                                <div className="address-input-container">
                                    <label>
                                        <input
                                            className='address-input-field'

                                            type='text'
                                            placeholder='Address'
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='city-input-container'>
                                    <label>
                                        <input
                                            className='city-input-field'
                                            type='text'
                                            placeholder='City'
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='state-input-container'>
                                    <label>
                                        <input
                                            className='state-input-field'
                                            type='text'
                                            placeholder='State'
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='country-input-container'>
                                    <label>
                                        <input
                                            className='country-input-field'
                                            type='text'
                                            placeholder='Country'
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='lat-input-container'>
                                    <label>
                                        <input
                                            className='lat-input-field'
                                            type='number'
                                            placeholder='Latitude'
                                            value={lat}
                                            onChange={(e) => setLat(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='lng-input-container'>
                                    <label>
                                        <input
                                            className='lng-input-field'
                                            type='number'
                                            placeholder='Longitude'
                                            value={lng}
                                            onChange={(e) => setLng(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='name-input-container'>
                                    <label>
                                        <input
                                            className='name-input-field'
                                            type='text'
                                            placeholder='Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='description-input-container'>
                                    <label>
                                        <input
                                            className='description-input-field'
                                            type='text'
                                            placeholder='Description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className='price-input-container'>
                                    <label>
                                        <input
                                            className='price-input-field'
                                            type='number'
                                            placeholder='Price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="login-button-container">
                                    <button className='login-button' type='submit'>Create Spot</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
