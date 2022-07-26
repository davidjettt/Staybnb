import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getSpotDetailsThunk } from '../../store/spots';

import './SpotDetail.css';

export default function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId));
    }, [dispatch])

    // const spot = useSelector((state) => {
    //     return Object.values(state.spots);
    // })

    const spot = useSelector((state) => {
        // console.log('USE SELECTOR', state.spots)
        return state.spots[spotId]
    })


    const user = useSelector(state => state.session.user?.id);

    // console.log ('SPOT DETAILS', spot)
    // console.log ('SPOT IMAGES', images.images)
    return (
        <>
        {spot && <div className='spot-details-main-container'>
                    <header className='spot-details-header-container'>
                        <div className='spot-name-container'>
                            <h1>{spot.name}</h1>
                        </div>
                        <div className='spot-details-container'>
                            <span>{spot.avgStarRating}</span>
                            {user === spot.ownerId ? <Link to={`/spots/${spotId}/edit`}>
                                Edit Spot
                            </Link> : null}
                        </div>
                    </header>
                    <div className='spot-images-container'>
                        {spot.Images && spot.Images.map((image, idx) => (
                            // console.log('IMAGES', image.url)
                            <img key={idx} style={{width: 300}} src={`${image.url}`} />
                        ))}
                    </div>
                    {/* {user === spot.ownerId ? } */}
                </div>}
        </>
    )
}
