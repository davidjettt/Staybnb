import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviewsThunk } from '../../store/reviews';
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

    // console.log('USE SELECTOR REVIEWS', reviews);

    return (
        <div className='main'>
            <div className='review-header-container'>
                <AiFillStar className='review-section-star' />
                <span className='rating-reviews'>
                    {avgRating?.toFixed(2)} • {numReviews} reviews</span>
            </div>
            <section className='spot-review-container'>
                {reviews.map((review, idx) => (
                    <div key={idx} className={'key'}>
                        <div className='review-first-name'>{review.User?.firstName} </div>
                        <div>{review.review} </div>
                    </div>
                ))}
            </section>
        </div>
    )
}
