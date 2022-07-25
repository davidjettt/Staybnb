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
        <>
            <div className='main-content-container'>
                {spots.map((spot, idx) => (
                    <div key={idx} className='card-spot'>
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
