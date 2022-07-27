import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { deleteSpotThunk, getSpotDetailsThunk } from '../../store/spots';

import './SpotDetail.css';
import SpotReviews from '../SpotReviews/SpotReviews';
import CreateReviewForm from '../CreateReviewForm/CreateReviewForm';
import { deleteReviewThunk, getAllReviewsThunk } from '../../store/reviews';
import EditReviewForm from '../EditReviewForm/EditReviewForm';

import { HiStar } from 'react-icons/hi';

export default function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ render, setRendered ] = useState(false);



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
    // console.log('USER', user)
    // console.log ('SPOT DETAILS', spot)
    // console.log ('SPOT IMAGES', images.images)


    const reviews = useSelector(state => {
        return Object.values(state.reviews)
    })

    const userReview = reviews.find(review => +review?.userId === +user)
    // console.log('USER REVIEW', userReview)

    const handleDelete = async () => {
        await dispatch(deleteSpotThunk(spotId));

        history.push('/');
    }

    const handleDeleteReview = async () => {
        await dispatch(deleteReviewThunk(userReview));
        setRendered(!render);
    }

    const avgRating = spot?.avgStarRating;
    const numReviews = spot?.numReviews;

    return (
        <div className='spot-details-main'>
        {spot && <div className='spot-details-main-container'>
                    <header className='spot-details-header-container'>
                        <div className='spot-name-container'>
                            <h1 className='spot-title'>{spot.name}</h1>
                        </div>
                        <div className='spot-details-container'>
                            <div className='star-rating-location'>
                                <HiStar />
                                <span className='rating-number'>{(spot.avgStarRating?.toFixed(2))}  • </span>
                                {spot.numReviews ? <span>{spot.numReviews} reviews </span> : <span>new spot </span>}
                                <span>  · {spot.city}, {spot.state}, {spot.country} </span>
                            </div>
                            <div className='spot-links-container'>
                                {user === spot.ownerId ? <Link  to={`/spots/${spotId}/edit`}>
                                    <button className='edit-spot-button'>Edit Spot</button>
                                </Link> : null}
                                {user === spot.ownerId ? <button className='delete-spot-button' onClick={handleDelete}>
                                    Delete Spot
                                </button> : null}
                            </div>
                        </div>
                    </header>
                    <div className='spot-images-container'>
                        {spot.Images && spot.Images.map((image, idx) => (

                                <img key={idx} className={'key' + idx} style={{}} src={`${image.url}`} />

                        ))}
                    </div>
                    <div className='subtitle-container'>
                            <h2 className='subtitle'>{spot.name} hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
                    </div>
                    <div className='reviews-container'>
                        <SpotReviews numReviews={numReviews} avgRating={avgRating} spotId={spotId} />
                        {/* <div>{spot.avgStarRating?.toFixed(2)}</div>
                        <div>{spot.numReviews} reviews</div> */}
                        {userReview && <EditReviewForm spotId={spotId} />}
                        {userReview && <button onClick={handleDeleteReview}>
                            Delete Review
                            </button>}
                        {user && <CreateReviewForm setRendered={setRendered} spotId={spotId} />}
                    </div>
                </div>}
        </div>
    )
}
