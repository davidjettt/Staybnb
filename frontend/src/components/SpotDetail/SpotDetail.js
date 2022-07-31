import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { deleteSpotThunk, getSpotDetailsThunk } from '../../store/spots';

import './SpotDetail.css';
import SpotReviews from '../SpotReviews/SpotReviews';
import CreateReviewForm from '../CreateReviewForm/CreateReviewForm';
import { getAllReviewsThunk } from '../../store/reviews';

import ReviewsModal from '../ReviewsModal/ReviewsModal';

import { HiStar } from 'react-icons/hi';

export default function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [ render, setRendered ] = useState(false);

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId));
        dispatch(getAllReviewsThunk(spotId))
    }, [dispatch, spotId])

    // const spot = useSelector((state) => {
    //     return Object.values(state.spots);
    // })

    const spot = useSelector((state) => {

        return state.spots[spotId]
    })

    const user = useSelector(state => state.session.user?.id);


    const reviews = useSelector(state => {
        return Object.values(state.reviews)
    })

    // const userReview = reviews.find(review => +review?.userId === +user)


    const handleDelete = async () => {
        await dispatch(deleteSpotThunk(spotId));

        history.push('/');
    }

    const test = () => {
        document.querySelector(".reviews-container").scrollIntoView({behavior: 'smooth' });
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
                                <HiStar className='star' />
                                <span className='rating-number'>{(spot.avgStarRating?.toFixed(2))}  • </span>
                                {/* {spot.numReviews ? <span className='review-click' onClick={test}>{spot.numReviews} reviews</span> : <span>new spot </span>} */}
                                <ReviewsModal spotId={spotId} numReviews={numReviews} avgRating={avgRating} />
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
                    <div className='spot-details-subtitle-description-container'>
                        <div className='subtitle-container'>
                                <h2 className='subtitle'>{spot.name} hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
                        </div>
                        <div className='description-container'>
                            <div className='description-content'>
                                {spot.description}
                            </div>
                        </div>
                    </div>
                    <div className='reviews-container'>
                        <SpotReviews numReviews={numReviews} avgRating={avgRating} spotId={spotId} />
                        {user && user !== spot.ownerId && <CreateReviewForm setRendered={setRendered} spotId={spotId} />}
                    </div>
                </div>}
        </div>
    )
}
