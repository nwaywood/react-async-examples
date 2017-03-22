import React from 'react'
import { connect } from 'react-redux'
import { requestArticles } from '../actions'

import Home from '../components/Home'

class HomeContainer extends React.Component {
    componentDidMount() {
        // react-redux magically gives all components access to dispatch
        const { dispatch } = this.props
        dispatch(requestArticles())

        this.onRefreshClick = this.onRefreshClick.bind(this)
    }

    onRefreshClick() {
        this.props.dispatch(requestArticles())
    }

    render() {
        const { isFetching, posts } = this.props
        return (
            <div>
                <button onClick={this.onRefreshClick}>Refresh</button>
                {isFetching ? <h2>Loading..</h2> : <Home posts={posts} />}
            </div>
        )
    }
}

// mapStateToProps defines the state tree gets converted into props
// for this component
const mapStateToProps = (state) => {
    const { posts, isFetching } = state

    return {
        posts,
        isFetching,
    }
}

export default connect(mapStateToProps)(HomeContainer)
