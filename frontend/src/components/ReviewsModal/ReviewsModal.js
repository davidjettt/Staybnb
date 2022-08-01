import { useState } from 'react';
import { ReviewModal } from '../../context/ReviewModal';

import SpotReviewsModal from '../SpotReviews/SpotReviewsModal';

import './ReviewsModal.css';



export default function ReviewsModal ({ spotId , numReviews, avgRating }) {
    const [ showReviewModal, setReviewShowModal ] = useState(false);
    const [ reviewModalClass, setReviewModalClass ] = useState('');
    // const spots = useSelector(state => Object.values(state.spots));

    // const currentUserId = useSelector(state => state.session.user?.id);

    // const spot = spots.find(spot => +spot.spotId === +spotId);


    const handleClose = () => {
        setReviewShowModal(false)
    }

    const handleOpen = () => {
        setReviewShowModal(true);
        // setReviewModalClass('body-overflow-hidden');
    }

    return (
        <>
            {numReviews ? <span className='review-click' onClick={handleOpen}>{numReviews} reviews</span> : <span>new spot </span>}
            {/* <button className='update-review-button' onClick={() => setShowModal(true)}>Update Review</button> */}
            {showReviewModal && <ReviewModal isOpen={showReviewModal} closeTimeoutMS={2000}  onClose={handleClose}>
                <SpotReviewsModal className={reviewModalClass} spotId={spotId} numReviews={numReviews} avgRating={avgRating} setReviewShowModal={setReviewShowModal}/>
            </ReviewModal>}
        </>
    )
}
