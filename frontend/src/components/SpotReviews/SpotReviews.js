import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviewsThunk } from '../../store/reviews';
import './SpotReviews.css';

export default function SpotReviews({ spotId }) {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllReviewsThunk(spotId))
    // }, [dispatch])

    // const reviews = useSelector((state) => {
    //     return state.reviews
    // });



    return (
        <>
            <h1>TESTING FROM SPOT REVIEWS</h1>
        </>
    )
}
