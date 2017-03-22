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
