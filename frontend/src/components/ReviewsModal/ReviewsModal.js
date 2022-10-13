import { useState } from 'react';
import { ReviewModal } from '../../context/ReviewModal';
import SpotReviewsModal from '../SpotReviews/SpotReviewsModal';
import './ReviewsModal.css';

export default function ReviewsModal ({ spotId , numReviews, avgRating }) {
    const [ showReviewModal, setReviewShowModal ] = useState(false);

    const handleClose = () => {
        setReviewShowModal(false)
    }

    const handleOpen = () => {
        setReviewShowModal(true);
    }

    return (
        <>
            {numReviews ? <span className='review-click' onClick={handleOpen}>{numReviews} reviews</span> : <span>new spot </span>}
            {showReviewModal && <ReviewModal isOpen={showReviewModal} closeTimeoutMS={2000}  onClose={handleClose}>
                <SpotReviewsModal spotId={spotId} numReviews={numReviews} avgRating={avgRating} setReviewShowModal={setReviewShowModal}/>
            </ReviewModal>}
        </>
    )
}
