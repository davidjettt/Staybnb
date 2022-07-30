import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { createSpotThunk, editSpotThunk } from '../../store/spots';

import './SpotForm.css'

export default function SpotForm({ spot, formType }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ address, setAddress ] = useState(spot?.address);
    const [ city, setCity ] = useState(spot?.city);
    const [ state, setState ] = useState(spot?.state);
    const [ country, setCountry ] = useState(spot?.country);
    const [ lat, setLat ] = useState(spot?.latitude || '');
    const [ lng, setLng ] = useState(spot?.longitude || '');
    const [ name, setName ] = useState(spot?.name);
    const [ description, setDescription ] = useState(spot?.description);
    const [ price, setPrice ] = useState(spot?.pricePerNight || '');
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

        if (formType === 'Create a Spot') {
            const spotData = await dispatch(createSpotThunk(spot)).catch(
                async (res) => {
                    const data = await res.json();
                    console.log(data)
                    if (data) setErrors(data.errors || [data.message]);
                }
            );

            if (spotData) {
                history.push(`/spots/${spotData.id}`);
            }

        } else {
            const spotData = await dispatch(editSpotThunk(spot)).catch(
                async (res) => {
                    const data = await res.json();
                    if (data) setErrors(data.errors || [data.message])
                }
            );

            if (spotData) {
                history.push(`/spots/${spot.id}`)
            }
        }
    };

    return (
        <>
            <div className="create-spot-form-container">
                <div className="create-spot-form-pane">
                    <div className="create-spot-form-title-container">
                        <h3 className='create-spot-form-title'>{formType}</h3>
                    </div>
                    <form className='create-spot-form' onSubmit={handleSubmit}>
                        <div className='input-container-main'>
                            <div className='input-container-sub'>
                                <div className="address-input-container">
                                    <label className='custom-2'>
                                        <input
                                            className='address-input-field'
                                            type='text'
                                            // placeholder='Address'
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>Address</span>
                                    </label>
                                </div>
                                <div className='city-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='city-input-field'
                                            type='text'
                                            // placeholder='City'
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>City</span>
                                    </label>
                                </div>
                                <div className='state-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='state-input-field'
                                            type='text'
                                            // placeholder='State'
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>State</span>
                                    </label>
                                </div>
                                <div className='country-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='country-input-field'
                                            type='text'
                                            // placeholder='Country'
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>Country</span>
                                    </label>
                                </div>
                                <div className='lat-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='lat-input-field'
                                            type='text'
                                            // placeholder='Latitude'
                                            value={lat}
                                            onChange={(e) => setLat(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>Latitude</span>
                                    </label>
                                </div>
                                <div className='lng-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='lng-input-field'
                                            type='text'
                                            // placeholder='Longitude'
                                            value={lng}
                                            onChange={(e) => setLng(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>Longitude</span>
                                    </label>
                                </div>
                                <div className='name-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='name-input-field'
                                            type='text'
                                            // placeholder='Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>Name</span>
                                    </label>
                                </div>
                                <div className='description-input-container'>
                                    <label className='custom-2'>
                                        <textarea
                                            className='description-input-field'
                                            type='text'
                                            placeholder='Description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                        {/* <span className='placeholder-2'>Description</span> */}
                                    </label>
                                </div>
                                <div className='price-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='price-input-field'
                                            type='text'
                                            // placeholder='Price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>Price</span>
                                    </label>
                                </div>
                                <div className="create-spot-button-container">
                                    <button className='login-button' type='submit'>{formType}</button>
                                </div>
                                <div className='errors'>
                                    <ul className="errors-list">
                                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
