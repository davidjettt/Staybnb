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



    console.log('spots', spots)

    return (
        <>
            <div className='main-content-container'>
                {spots.map((spot) => (
                        <Link to={`/api/spots/${spot.id}`}>
                            <img style={{width: 277, height: 263}} src={spot.previewImage}/>
                        </Link>
                ))}
                {spots.map((spot) => (
                        <h4>{`${spot.city}, ${spot.state}`}</h4>
                ))}

            </div>
        </>
    )
}
