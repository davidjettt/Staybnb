import { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import EditReviewFormModal from './EditReviewFormModal';

export default function EditReviewForm ({ reviewId }) {
    const [ showModal, setShowModal ] = useState(false);

    const reviews = useSelector(state => Object.values(state.reviews));
    // const review = reviews.find(review => +review.userId === +currentUserId);
    const review = reviews.find(review => +review.id === +reviewId);



    const handleClose = () => {
        setShowModal(false)
    }

    const handleClick = () => {
        setShowModal(true);
    }

    return (
        <>
            <button className='update-review-button' onClick={handleClick}>Update Review</button>
            {showModal && <Modal onClose={handleClose}>
                <EditReviewFormModal setShowModal={setShowModal} review={review} formType='Update Review' />
            </Modal>}
        </>
    )
}
