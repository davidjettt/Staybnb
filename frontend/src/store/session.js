import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// const GET_SPOTS_BY_USER = 'spots/getSpotsByUser';


export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

// export const getSpotsByUser = (spots) => {
//     return {
//         type: GET_SPOTS_BY_USER,
//         payload: spots
//     }
// }


// Login thunk -- POST
export const login = (user) => async (dispatch) => {
    const { email, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    const data = await response.json();
    // console.log(data.user)
    dispatch(setUser(data));
    return response;
}

// Restore session user thunk -- GET
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session')
    // .catch(e => {
    //     return;
    // })

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
        return response;
    }
}

// Sign up user thunk
export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, email, password } = user;

    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        })
    })

    const data = await response.json();
    dispatch(setUser(data))
    return response;
}

// Logout user thunk
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })


    dispatch(removeUser());
    return response;
}

// export const getSpotsByUserThunk = () => async (dispatch) => {
//     const response = await fetch('/api/your-spots');
//     // console.log('response', response)

//     if (response.ok) {
//         const data = await response.json();
//         // console.log('data', data)
//         dispatch(getSpotsByUser(data));
//     }
// }

const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case SET_USER: {
            newState = {...state};
            newState.user = action.payload;
            return newState;
        }
        case REMOVE_USER: {
            newState = {...state};
            newState.user = null;
            return newState;
        }
        // case GET_SPOTS_BY_USER: {
        //     newState = {...state}
        //     newState.spots = action.payload.spots
        //     return newState;
        // }
        default:
            return state;
    }
}
