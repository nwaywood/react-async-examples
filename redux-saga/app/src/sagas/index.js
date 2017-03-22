import { put, call, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions'

export function fetchArticlesApi() {
    return fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=50')
        .then(response => response.json())
}

export function* fetchArticles() {
    const json = yield call(fetchArticlesApi)
    yield put(actions.receiveArticles(json))
}

// the reducer will handle the REQUEST_ARTICLES action like normal
// and then this generator will trigger the fetchArticles generator
// each time the REQUEST_ARTICLES action is dispatched
export function* watchRequestArticles() {
    yield takeLatest(actions.REQUEST_ARTICLES, fetchArticles)
}

// calling sagaMiddleware.run of this will initialise all generators
// in the array
export default function* rootSaga() {
    yield [
        fetchArticles(),
        watchRequestArticles(),
    ]
}
