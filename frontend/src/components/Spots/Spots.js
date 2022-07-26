import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpotsThunk } from '../../store/spots';
import { Link } from 'react-router-dom';
import './Spots.css';



export default function Spots() {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllSpotsThunk());

    }, [dispatch])

    const spots = useSelector((state) => {
        return Object.values(state.spots)
    })

    // console.log('spots', spots)

    return (
        <div className='main'>
            <div className='main-content-parent-container'>
                <div className='main-content-container'>
                    {spots.map((spot, idx) => (
                        <div key={idx} className='card-spot-container'>
                            <Link className='card-spot-link' to={`/spots/${spot.id}`}>
                                <img className='card-spot-image' style={{width: 289, height: 275}} src={spot.previewImage}/>
                                <div className='card-spot-text-container'>
                                    <div className='card-spot-location'>{`${spot.city}, ${spot.state}`}</div>
                                    <span className='card-spot-price'>{`$${spot.pricePerNight} night`}</span>
                                </div>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
