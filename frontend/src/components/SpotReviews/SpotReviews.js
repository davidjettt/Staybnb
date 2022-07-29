import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditReviewForm from '../EditReviewForm/EditReviewForm';
import { getAllReviewsThunk, editReviewThunk, deleteReviewThunk } from '../../store/reviews';
import { AiFillStar } from 'react-icons/ai';
import './SpotReviews.css';
import { getSpotDetailsThunk } from '../../store/spots';

export default function SpotReviews({ spotId, numReviews, avgRating, reviewModalClass }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReviewsThunk(spotId))
    }, [dispatch])

    const reviews = useSelector((state) => {
        return Object.values(state.reviews)
    });

    const user = useSelector(state => state.session.user?.id);

    const userReview = reviews.find(review => +review?.userId === +user)


    const handleDeleteReview = async () => {
        await dispatch(deleteReviewThunk(userReview));
        await dispatch(getSpotDetailsThunk(spotId));
        // setRendered(!render);
    }

    // console.log('USE SELECTOR REVIEWS', reviews);


    return (
        <div className='spot-reviews-main'>
            <div className='review-header-container'>
                <AiFillStar className='review-section-star' />
                <span className='rating-reviews'>
                    {avgRating?.toFixed(2)} • {numReviews} reviews</span>
            </div>
            <div className='spot-review-container'>
                {reviews.map((review, idx) => (
                    <div key={idx} className={'key'}>
                        <div className='name-buttons-container'>
                            {review.User && <div className='review-first-name'>{review.User.firstName}</div>}
                            <div className='update-delete-buttons-container'>
                                {user === review.userId && <EditReviewForm spotId={spotId} />}
                                {user === review.userId && <button className='delete-review-button' onClick={handleDeleteReview}>
                                Delete Review
                                </button>}
                            </div>
                        </div>
                        <div>{review.review} </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
