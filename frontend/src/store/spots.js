
const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SPOTS_BY_USER = 'spots/getSpotsByUser';

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

export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllSpots(data))
        return data;
    }
}

export const getSpotsByUserThunk = () => async (dispatch) => {
    const response = await fetch('/api/your-spots');
    console.log('response', response)

    if (response.ok) {
        const data = await response.json();
        console.log('data', data)
        dispatch(getSpotsByUser(data));
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
        case GET_SPOTS_BY_USER: {
            console.log('PAYLOAD', action.payload)
            let newState2 = {}
            action.payload.spots.forEach((spot) => {
                newState2[spot.id] = spot;
            })
            console.log('NEW STATE', newState2)
            return newState2;
        }
        default:
            return state
    }
}
