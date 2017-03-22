import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs'
import { REQUEST_ARTICLES, receiveArticles } from '../actions'

const rootEpic = action$ =>
    action$.ofType(REQUEST_ARTICLES)
        .mergeMap(action =>
            ajax({
                method: 'GET',
                url: 'https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=50',
                crossDomain: true,
                responseType: 'json',
            })
            .map(payload => payload.response)
            .map(json => receiveArticles(json)),
        )
            // NOTE: for some funky reason this code doesn't work. Maybe something about CORS with rxjs ajax method
            // ajax.getJSON('https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=50')
            //     .map(response => receiveArticles(response)),
            // )

export default rootEpic
