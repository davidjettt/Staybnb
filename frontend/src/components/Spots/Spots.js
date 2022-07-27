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
                                    <div className='distance'>80 miles away</div>
                                    <div className='date'>Jan 22 - 27</div>
                                    <div className='price-container'>
                                        <span className='card-spot-price'>{`$${spot.pricePerNight}`} </span>
                                        <span className='night-word'>night</span>
                                    </div>
                                    <div className='star-rating'>* 4.95</div>
                                </div>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
