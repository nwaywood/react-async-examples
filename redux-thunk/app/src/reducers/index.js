import { RECEIVE_ARTICLES, REQUEST_ARTICLES } from '../actions'

const initialState = {
    posts: [],
    isFetching: false,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case REQUEST_ARTICLES: {
        const newState = Object.assign({}, state, {
            isFetching: true,
        })
        return newState
    }
    case RECEIVE_ARTICLES: {
        const newState = Object.assign({}, state, {
            posts: action.posts,
            isFetching: false,
        });
        return newState
    }
    default:
        return state
    }
}

export default rootReducer
