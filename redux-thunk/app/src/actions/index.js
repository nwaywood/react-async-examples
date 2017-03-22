// export the action names for the switch cases in the reducers
export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES'

export const requestArticles = () => ({
    type: REQUEST_ARTICLES,
})

export const receiveArticles = json => ({
    type: RECEIVE_ARTICLES,
    posts: json.hits,
})

// redux-thunk action to perform ajax request
export const fetchArticles = () => (dispatch) => {
    dispatch(requestArticles())
    return fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=50')
        .then(response => response.json())
        .then(json => dispatch(receiveArticles(json)))
}
