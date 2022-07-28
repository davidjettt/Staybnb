import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviewThunk, getReviewsUserThunk } from '../../store/reviews';
import { Link } from 'react-router-dom';


import './YourReviews.css';
import EditReviewForm from '../EditReviewForm/EditReviewForm';

export default function YourReviews () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviewsUserThunk());

    }, [dispatch])

    const reviews = useSelector((state) => {
        return Object.values(state.reviews);
    })


    return (
        <div className='your-reviews-main'>
            <div className='your-reviews-heading-container'>
                <h3 className='your-reviews-heading'>Your Reviews</h3>
            </div>
            <div className='your-reviews-content-container'>
                {reviews.map((review, idx) => (
                    <div key={idx} className='your-reviews-page-container'>
                        {/* <Link to={`/spots/${review.spotId}`}>
                            <button className='go-to-spot-button'>Go To Spot</button>
                        </Link> */}
                        <div className='your-reviews-text-content'>
                            <Link className='your-reviews-spot-link' to={`/spots/${review.spotId}`}>
                                <div className='spot-name-location-container'>
                                    <span className='your-review-spot-name'>{review.Spot?.name} • </span>
                                    <span>{review.Spot?.city}, {review.Spot?.state}, {review.Spot?.country}</span>
                                </div>
                            </Link>
                            <div className='your-review-text-container'>
                                {review.review}
                            </div>
                        </div>
                        {review.Images && <div className='your-reviews-images-container'>
                            {review.Images.map((image, idx) => (
                                <img className={'your-reviews' + idx} key={idx} src={image.url} />
                            ))}
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}
