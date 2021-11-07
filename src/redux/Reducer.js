import ACTION_TYPES from './ActionTypes';

const initialState = {
    loading: true,
    data: [],
    genres: [],
    details: [],
    credits: [],
    error: ''
};

const apiReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.API_PENDING:
            return {
                ...state,
                loading: true,
            }
        case ACTION_TYPES.API_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,

            }
        case ACTION_TYPES.API_GENRES:
            return {
                ...state,
                genres: action.payload,
                loading: false,
            }
        case ACTION_TYPES.API_DETAILS:
            return {
                ...state,
                details: action.payload,
                loading: false,
            }
        case ACTION_TYPES.API_CREDITS:
            return {
                ...state,
                credits: action.payload,
                loading: false,
            }
        case ACTION_TYPES.API_ERROR:
            return {
                ...state.error,
                error: action.payload,
                loading: false,
            }

        default:
            return state;
    }
};

export default apiReducer;