import { csrfFetch } from "./csrf";

const GET_REVIEWS_USER = 'reviews/getReviewsUser';
const GET_ALL_REVIEWS = 'reviews/getAllReviews';
const CREATE_REVIEW  = 'reviews/createReview';
const EDIT_REVIEW = 'reviews/editReview';

export const getReviewsUser = (reviews) => {
    return {
        type: GET_REVIEWS_USER,
        payload: reviews
    }
}

export const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review
    }
}

export const editReview = (review) => {
    return {
        type: EDIT_REVIEW,
        payload: review
    }
}

export const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        payload: reviews
    }
}

// GET ALL REVIEWS BY USER THUNK
export const getReviewsUserThunk = () => async (dispatch) => {
    const response = await fetch('/api/your-reviews');

    if (response.ok) {
        const data = await response.json();
        dispatch(getReviewsUser(data));
    }
}

// GET ALL REVIEWS BY SPOT ID
export const getAllReviewsThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data =  await response.json();
        console.log('DATA', data)
        dispatch(getAllReviews(data));
        return data;
    }
}

// CREATE REVIEW THUNK
export const createReviewThunk = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    // .catch(err => console.log(err.message))

    if (response.ok) {
        const data = await response.json();
        dispatch(createReview(data));
        return data;
    }
}

// EDIT REVIEW THUNK
export const editReviewThunk = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    // .catch(err => console.log(err.message))

    if (response.ok) {
        const data = await response.json();
        dispatch(createReview(data));
        return data;
    }
}



const initialState = {};

export default function reviewsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_REVIEWS_USER: {
            let newState = {};
            action.payload.reviews.forEach((review) => {
                newState[review.id] = review;
            })
            return newState;
        }
        case GET_ALL_REVIEWS: {
            let newState = {};
            action.payload.reviews.forEach((review) => {
                newState[review.id] = review;
            })
            return newState;
        }
        case CREATE_REVIEW: {
            let newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case EDIT_REVIEW: {
            let newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        default: {
            return state;
        }
    }
}
