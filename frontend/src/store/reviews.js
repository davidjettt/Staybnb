
const GET_ALL_REVIEWS = 'reviews/getAllReviews';
const CREATE_REVIEW  = 'reviews/createReview';

export const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review
    }
}

export const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        payload: reviews
    }
}

// GET ALL REVIEWS BY SPOT ID
export const getAllReviewsThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = response.json();
        dispatch(getAllReviews(data));
        return data;
    }
}

// CREATE REVIEW THUNK
// export const createReviewThunk = (review) => async (dispatch) => {
//     const response = await fetch(`/api/spots/${review.spotId}/reviews`, {

//     })
// }



const initialState = {}

export default function reviewsReducer (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_REVIEWS: {
            let newState = {};
            newState[action.payload.id] = action.payload;
            return newState;
        }
    }
}
