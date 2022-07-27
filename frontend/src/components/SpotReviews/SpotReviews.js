import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviewsThunk } from '../../store/reviews';
import './SpotReviews.css';

export default function SpotReviews({ spotId }) {
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
            <h1>TESTING FROM SPOT REVIEWS</h1>
            <div className='reviews-container'>
                {reviews.map((review) => (
                    <div>
                        <span>{review.review} </span>
                        <span>{review.stars} </span>
                        <span>{review.User.firstName} </span>
                        <span>{review.User.lastName}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
