import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";

export default function DeleteYourReview({ review }) {
    const dispatch = useDispatch();
    const [ showDelete, setShowDelete ] = useState(false)

    const handleShowDeleteModal = () => {
        setShowDelete(true)
    }

    const handleDeleteReview = async () => {
        await dispatch(deleteReviewThunk(review));
    }

    return (
        <>
            <button className="delete-your-review-button" onClick={handleShowDeleteModal}>Delete Review</button>
            {showDelete && <Modal onClose={() => setShowDelete(false)}>
                <DeleteConfirmation review={review} setShowDelete={setShowDelete} />
            </Modal>}
        </>
    )
}
