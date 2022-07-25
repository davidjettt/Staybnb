
const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SPOTS_BY_USER = 'spots/getSpotsByUser';
const GET_SPOT_DETAILS = 'spots/getSpotDetails';

export const getAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    }
}
export const getSpotsByUser = (spots) => {
    return {
        type: GET_SPOTS_BY_USER,
        payload: spots
    }
}
export const getSpotDetails = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
        payload: spot
    }
}

// GET ALL SPOTS THUNK
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllSpots(data))
        return data;
    }
}

// GET ALL SPOTS THAT BELONG TO CURRENT USER
export const getSpotsByUserThunk = () => async (dispatch) => {
    const response = await fetch('/api/your-spots');
    // console.log('response', response)

    if (response.ok) {
        const data = await response.json();
        // console.log('data', data)
        dispatch(getSpotsByUser(data));
    }
}

// GET DETAILS OF A SPOT BY ID
export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)
        .catch(err => console.log(err))

    console.log('RESPONSE', response);

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpotDetails(data));
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
    console.log('ACTION', action)
    switch(action.type) {
        case GET_ALL_SPOTS: {
            let newState = {...state};
            action.payload.spots.forEach((spot) => {
                newState[spot.id] = spot;
            })
            return newState;
        }
        case GET_SPOTS_BY_USER: {
            // console.log('PAYLOAD', action.payload)
            let newState2 = {}
            action.payload.spots.forEach((spot) => {
                newState2[spot.id] = spot;
            })
            // console.log('NEW STATE', newState2)
            return newState2;
        }
        case GET_SPOT_DETAILS: {
            console.log('payload', action.payload)
            let newState = {};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        default:
            return state
    }
}
