import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsByUserThunk } from '../../store/spots';
import { Link } from 'react-router-dom';
import './YourSpots.css';

export default function YourSpots() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpotsByUserThunk());

    }, [dispatch])

    const spots = useSelector((state) => {
        return Object.values(state.spots);
    })



    // return (
    //     <div className='main'>
    //         <div className='main-content-parent-container'>
    //             <div className='main-content-container'>
    //                 {spots.map((spot, idx) => (
    //                     <div key={idx} className='card-spot'>
    //                         <Link className='card-spot-link' to={`/spots/${spot.id}`}>
    //                             <img className='card-spot-image' style={{width: 289, height: 275}} src={spot.previewImage}/>
    //                             <div className='card-spot-text-container'>
    //                                 <div className='card-spot-location'>{`${spot.city}, ${spot.state}`}</div>
    //                                 <span className='card-spot-price'>{`$${spot.pricePerNight} night`}</span>
    //                             </div>
    //                         </Link>
    //                     </div>
    //                 ))}

    //             </div>
    //         </div>
    //     </div>
    // )


    return (
        <>
            <div className='main-content-container'>
                {spots.map((spot) => (
                    <div className='card-spot'>
                        <Link to={`/spots/${spot.id}`}>
                            <img style={{width: 277, height: 263}} src={spot.previewImage}/>
                            <h4>{`${spot.city}, ${spot.state}`}</h4>
                            <h5>{`$${spot.pricePerNight} night`}</h5>
                        </Link>
                    </div>
                ))}

            </div>
        </>
    )
}
