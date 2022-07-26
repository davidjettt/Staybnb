import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsUserThunk } from '../../store/reviews';
import { Link } from 'react-router-dom';


import './YourReviews.css';

export default function YourReviews () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviewsUserThunk());

    }, [dispatch])

    const reviews = useSelector((state) => {
        return Object.values(state.reviews);
    })

    return (
        <>
            <div className='reviews-main-container'>
                {reviews.map((review, idx) => (
                    <div className='review-container'>
                        {review.Images && <div className='images-container'>
                            {review.Images.map((image) => (
                                <img style={{width: 300}} src={image.url} />
                            ))}
                        </div>}
                        <div>{review.review}</div>
                    </div>
                ))}
            </div>
        </>
    )
}
