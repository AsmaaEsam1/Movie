import ACTION_TYPES from "./ActionTypes";

export const fetchData = () => ({
    type: ACTION_TYPES.API_PENDING
});

export const fetchSuccess = data => ({
    type: ACTION_TYPES.API_SUCCESS,
    payload: data
})
export const fetchGenres = genres => ({
    type: ACTION_TYPES.API_GENRES,
    payload: genres
})
export const fetchDetails = details => ({
    type: ACTION_TYPES.API_DETAILS,
    payload: details
})
export const fetchCredits = credits => ({
    type: ACTION_TYPES.API_CREDITS,
    payload: credits
})
export const fetchError = error => ({
    type: ACTION_TYPES.API_ERROR,
    payload: error
})