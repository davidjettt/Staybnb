import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";

export default function DeleteYourReview({ review }) {
    const dispatch = useDispatch();

    const handleDeleteReview = async () => {
        await dispatch(deleteReviewThunk(review));
    }

    return (
        <>
            <button onClick={handleDeleteReview}>Delete Review</button>
        </>
    )
}
