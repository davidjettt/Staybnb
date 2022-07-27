import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditReviewForm from '../EditReviewForm/EditReviewForm';
import { getAllReviewsThunk, editReviewThunk, deleteReviewThunk } from '../../store/reviews';
import { AiFillStar } from 'react-icons/ai';
import './SpotReviews.css';

export default function SpotReviews({ spotId, numReviews, avgRating }) {
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
                        { review.User && <div className='review-first-name'>{review.User.firstName} </div>}
                        <div>{review.review} </div>
                    </div>
                ))}
            </div>
                {/* {userReview && <EditReviewForm spotId={spotId} />}
                {userReview && <button onClick={handleDeleteReview}>
                    Delete Review
                    </button>} */}
        </div>
    )
}
