import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditReviewForm from '../EditReviewForm/EditReviewForm';
import { getAllReviewsThunk, editReviewThunk, deleteReviewThunk } from '../../store/reviews';
import { AiFillStar } from 'react-icons/ai';
import './SpotReviewsModal.css';
import { getSpotDetailsThunk } from '../../store/spots';

export default function SpotReviewsModal ({ spotId, numReviews, avgRating, setReviewShowModal }) {
    const [ overflow, setOverflow ] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReviewsThunk(spotId))
    }, [dispatch])


    useEffect(() => {
        if (!overflow) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '15px';
        }
        return () => {
            document.body.style.overflow = 'visible'
            document.body.style.paddingRight = '0px';
        }
    }, [overflow]);


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

    const closeReviewsModal = () => {
        setReviewShowModal(false);
    }


    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className='modal-spot-reviews-main'>
            <div className='modal-header-reviews'>
                <button onClick={closeReviewsModal} className='x-button-login x-button-modal-reviews'>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: 16, width: 16, stroke: 'currentcolor', strokeWidth: 3, overflow: 'visible'}}><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
                </button>
            </div>
            <div className='modal-reviews-content-container'>
                <div className='modal-review-header-container'>
                    <AiFillStar className='modal-review-section-star' />
                    <span className='modal-rating-reviews'>
                        {avgRating?.toFixed(2)} • {numReviews} reviews</span>
                </div>
                <div className='modal-spot-review-container'>
                    {reviews.map((review, idx) => (
                        <div key={idx} className={'reviews-modal-key'}>
                            <div className='modal-name-buttons-container'>
                                <div className='reviews-modal-name-date-container'>
                                    {review.User && <div className='modal-review-first-name'>{review.User.firstName}</div>}
                                    <div className='reviews-modal-date'>{monthNames[new Date(review.createdAt).getMonth()]} {new Date(review.createdAt).getFullYear()}</div>
                                </div>
                                {/* <div className='modal-update-delete-buttons-container'>
                                    {user === review.userId && <EditReviewForm setReviewShowModal={setReviewShowModal} spotId={spotId} />}
                                    {user === review.userId && <button className='delete-review-button' onClick={handleDeleteReview}>
                                    Delete Review
                                    </button>}
                                </div> */}
                            </div>
                            <div>{review.review} </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
