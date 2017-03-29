import { FETCH_ARTICLES_PENDING, FETCH_ARTICLES_FULFILLED } from '../actions';

const initialState = {
    posts: [],
    isFetching: false,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_ARTICLES_PENDING: {
        const newState = Object.assign({}, state, {
            isFetching: true,
        });
        return newState;
    }
    case FETCH_ARTICLES_FULFILLED: {
        const newState = Object.assign({}, state, {
            posts: action.payload.hits,
            isFetching: false,
        });
        return newState;
    }
    default:
        return state;
    }
};

export default rootReducer;
