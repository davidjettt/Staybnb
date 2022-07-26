import { useState } from 'react';
import { Modal } from '../../context/Modal';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ReviewForm from "../ReviewForm/ReviewForm";


export default function EditReviewForm ({ spotId }) {
    const [ showModal, setShowModal ] = useState(false);

    const reviews = useSelector(state => Object.values(state.reviews));

    const review = reviews.find(review => +review.spotId === +spotId)

    const handleClose = () => {
        // setRendered(false)
        setShowModal(false)
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Update Your Review</button>
            {showModal && <Modal onClose={handleClose}>
                <ReviewForm setShowModal={setShowModal} review={review} formType='Update Review' />
            </Modal>}
        </>
    )
}
