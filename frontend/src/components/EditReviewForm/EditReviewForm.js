import { useState } from 'react';
import { Modal } from '../../context/Modal';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import ReviewForm from "../ReviewForm/ReviewForm";
import EditReviewFormModal from './EditReviewFormModal';


export default function EditReviewForm ({ spotId }) {
    const [ showModal, setShowModal ] = useState(false);

    const reviews = useSelector(state => Object.values(state.reviews));

    const currentUserId = useSelector(state => state.session.user?.id);

    const review = reviews.find(review => +review.userId === +currentUserId);

    const handleClose = () => {
        // setRendered(false)
        setShowModal(false)
    }

    return (
        <>
            <button className='update-review-button' onClick={() => setShowModal(true)}>Update Review</button>
            {showModal && <Modal onClose={handleClose}>
                <EditReviewFormModal setShowModal={setShowModal} review={review} formType='Update Review' />
            </Modal>}
        </>
    )
}
