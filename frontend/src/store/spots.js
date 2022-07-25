
const GET_ALL_SPOTS = 'spots/getAllSpots';

export const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    }
}

export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllSpots(data))
        return data;
    }
}


// const initialState = () => async (dispatch) => {
//     const response = await fetch('/api/spots');

//     let newState = {};
//     if (response.ok) {
//         const data = await response.json();
//         data.forEach((spot) => {
//             newState[spot.id] = spot;
//         })
//         return newState;
//     }
// }

const initialState = {};

export default function spotsReducer(state = initialState, action) {
    let newState;
    // console.log(action)
    switch(action.type) {
        case GET_ALL_SPOTS: {
            newState = {...state};
            action.payload.spots.forEach((spot) => {
                newState[spot.id] = spot;
            })
            return newState;
        }
        default:
            return state
    }
}
