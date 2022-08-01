import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsByUserThunk } from '../../store/spots';
import { Link } from 'react-router-dom';
import { TiStar } from 'react-icons/ti';
import './YourSpots.css';
import '../Spots/Spots.css';

export default function YourSpots() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpotsByUserThunk());

    }, [dispatch])

    const userId = useSelector(state => state.session.user?.id)

    const spots = useSelector((state) => {
        return Object.values(state.spots);
    })



    return (
        <>
            <div className='main-your-spots'>
                <div className='your-spots-header-container'>
                    {/* <h3>{spots.length ? 'Your Spots' : 'You Don\'t Have Any Spots Yet!'}</h3> */}
                    <h3>Your Spots</h3>
                </div>
                <div className='main-content-parent-container'>
                    <div className='main-content-container'>
                        {spots.map((spot, idx) => (
                            <>
                            {spot.ownerId === userId && <div key={idx} className='card-spot-container'>
                                <Link className='card-spot-link' to={`/spots/${spot.id}`}>
                                    <img className='card-spot-image' style={{width: 289, height: 275}} src={spot.previewImage} alt=''/>
                                    <div className='card-spot-text-container'>
                                        <div className='card-spot-location'>{`${spot.city}, ${spot.state}`}</div>
                                        <div className='distance'>80 miles away</div>
                                        <div className='date'>Jan 22 - 27</div>
                                        <div className='price-container'>
                                            <span className='card-spot-price'>{`$${spot.pricePerNight}`} </span>
                                            <span className='night-word'>night</span>
                                        </div>
                                        <div className='star-rating'>
                                            <TiStar  />
                                            {spot.Reviews?.length ? (spot.Reviews.reduce((acc, review) => {
                                                return acc + review.stars
                                            }, 0) / spot.Reviews.length).toFixed(2) : 'new spot'}
                                        </div>
                                    </div>
                                </Link>
                            </div>}
                            </>
                        ))}
                    </div>
                </div>
        </div>
    </>
    )
}
