import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { deleteSpotThunk, getSpotDetailsThunk } from '../../store/spots';

import './SpotDetail.css';
import SpotReviews from '../SpotReviews/SpotReviews';
import CreateReviewForm from '../CreateReviewForm/CreateReviewForm';
import { getAllReviewsThunk } from '../../store/reviews';

export default function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ render, setRendered ] = useState(false);

    if (!render) setRendered(true);


    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId));
        dispatch(getAllReviewsThunk(spotId))
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


    const handleDelete = async () => {
        await dispatch(deleteSpotThunk(spotId));

        history.push('/');
    }

    return (
        <>
        {spot && <div className='spot-details-main-container'>
                    <header className='spot-details-header-container'>
                        <div className='spot-name-container'>
                            <h1>{spot.name}</h1>
                        </div>
                        <div className='spot-details-container'>
                            <span>{(spot.avgStarRating.toFixed(2))}</span>
                            {user === spot.ownerId ? <Link to={`/spots/${spotId}/edit`}>
                                Edit Spot
                            </Link> : null}
                            {user === spot.ownerId ? <button onClick={handleDelete}>
                                Delete Spot
                            </button> : null}
                        </div>
                    </header>
                    <div className='spot-images-container'>
                        {spot.Images && spot.Images.map((image, idx) => (
                            // console.log('IMAGES', image.url)
                            <img key={idx} style={{width: 300}} src={`${image.url}`} />
                        ))}
                    </div>
                    {/* {user === spot.ownerId ? } */}
                    <div className='reviews-container'>
                        <SpotReviews spotId={spotId} />
                        {user && <CreateReviewForm setRendered={setRendered} spotId={spotId} />}
                    </div>
                </div>}
        </>
    )
}
