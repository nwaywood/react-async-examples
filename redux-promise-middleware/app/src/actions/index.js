// export the action names for the switch cases in the reducers
export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLES_PENDING = 'FETCH_ARTICLES_PENDING';
export const FETCH_ARTICLES_FULFILLED = 'FETCH_ARTICLES_FULFILLED';

export const fetchArticles = () => ({
    type: FETCH_ARTICLES,
    payload: fetchArticlesPromise(),
});

const url = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=50';
const fetchArticlesPromise = () => fetch(url).then(response => response.json());
