import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditReviewForm from '../EditReviewForm/EditReviewForm';
import { deleteReviewThunk } from '../../store/reviews';
import { AiFillStar } from 'react-icons/ai';
import './SpotReviews.css';
import { getAllSpotsThunk, getSpotDetailsThunk } from '../../store/spots';
import { Modal } from '../../context/Modal';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import DeleteYourReview from '../YourReviews/DeleteYourReview';

export default function SpotReviews({ spotId, numReviews, avgRating }) {
    const dispatch = useDispatch();
    const [ showDelete, setShowDelete ] = useState(false)
    const reviews = useSelector((state) => {
        return Object.values(state.reviews).filter(review => +review.spotId === +spotId)
    });
    const user = useSelector(state => state.session.user?.id);
    const userReview = reviews.find(review => +review?.userId === +user)

    const handleDeleteReview = async () => {
        await dispatch(deleteReviewThunk(userReview));
        await dispatch(getAllSpotsThunk())
        // await dispatch(getSpotDetailsThunk(spotId));
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleShowDeleteModal = () => {
        setShowDelete(true)
    }

    return (
        <div className='spot-reviews-main'>
            <div className='review-header-container'>
                <AiFillStar className='review-section-star' />
                <span className='rating-reviews'>
                    {avgRating ? avgRating?.toFixed(2) : null} • {numReviews} reviews</span>
            </div>
            <div className='spot-review-container'>
                {reviews.length > 0 && reviews.map((review, idx) => (
                    <div key={idx} className={'key'}>
                        <div className='name-buttons-container'>
                            <div className='spot-reviews-name-date-container'>
                                <div className='review-first-name'>{review.User?.firstName}</div>
                                <div className='spot-reviews-date'>{monthNames[new Date(review.createdAt).getMonth()]} {new Date(review.createdAt).getFullYear()}</div>
                            </div>
                            <div className='update-delete-buttons-container'>
                                {user === review.userId && <EditReviewForm spotId={spotId} reviewId={userReview.id} />}
                                {/* {user === review.userId && <button className='delete-review-button' onClick={handleShowDeleteModal}>
                                Delete Review
                                </button>} */}
                                {user === review.userId && <DeleteYourReview review={userReview} />}
                                {showDelete && <Modal onClose={() => setShowDelete(false)}>
                                    <DeleteConfirmation review={userReview} setShowDelete={setShowDelete} />
                                </Modal>}
                            </div>
                        </div>
                        <div className='spot-review-text'>{review?.review} </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
