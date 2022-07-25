
const GET_ALL_SPOTS = 'spots/getAllSpots';

export const getAllSpots = () => {
    return {
        type: GET_ALL_SPOTS
    }
}

export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await fetch('/api/spots');

}


const initialState = {};

export default function spotsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_SPOTS: {

        }
        default:
            return state
    }
}
