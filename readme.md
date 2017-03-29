# react-async

Example of different ways to manage async in React. The same sample application is implemented in:

- Native react - using `setState()` and `promises`
- Redux - with `redux-thunk` middleware
- Redux - with `redux-promise-middleware` middleware
- Redux - with `redux-saga` middleware
- Redux - with `redux-observable` middleware


## Comparison

Note: This comparison is from the perspective of dealing with a REST API. This comparison would be very different from
the perspective of other async operations.

- `setState()` doesn't scale as well as Redux, but it requires less boilerplate and understanding of FP concepts. Quite
    suitable for small applications that aren't overly data-driven

### Redux

When `setState()` is to adhoc for your needs and you need more structure to your state management, `redux` is by far
the most popular choice in the React community (followed by `mobx`). Here I have compared the three most popular `redux`
middleware's for handling async with `redux`:

#### Redux-thunk

Conceptually, `redux-thunk` is definitely the simplest of the three middleware's. It allows actions to be functions
which can perform async work and call `dispatch` when it has completed (`redux-thunk` passes `dispatch` as as argument
to the function).

A downside of `redux-thunk` is that it makes `redux`s separation of concerns 'fuzzier'. Normally in redux, actions are
just javascript objects that get dispatched to the reducers to modify the state. However, when you use `redux-thunk`, this
is no longer true. Some of your actions will still be javascript objects that describe an action to perform and some will
be `thunks` that do whatever they want. This mix of concerns makes the flow of the application less transparent. You no longer
have the guarantee that a call to `dispatch()` is dispatching an action that is going to be handled by a reducer/s. Instead
you need to manually trace the flow of a `dispatch()` call to know what its doing.

#### Redux-promise-middleware

`redux-promise-middleware` conceptually works exactly the same as `redux-thunk` except that is does some more 'magic'
than `redux-thunk`. With `redux-promise-middleware` you directly dispatch a promise within an action and the middleware
automatically dispatches the appropriate actions for you (with `_PENDING`, `_FULFILLED` and `_REJECTED` suffixes).
Therefore the tradeoffs compared to `redux-thunk` are less boilerplate, but less flexibility.

#### Redux-saga

`redux-saga` doesn't have the separation of concerns issue like `redux-thunk` does, actions and reducers in `redux-saga`
behave just as they do in vanilla redux. When a normal action is dispatched, it will first be processed by the reducers
and then handled by the middleware (if the middleware has a `saga` defined to process that action). This behavior is
more inline with how middleware traditionally works.

#### redux-observable

`redux-observable` has the same advantages as `redux-saga`. In addition, it is far more powerful than `redux-saga` because
it leverages RxJS and reactive programming. However, increased complexity comes with this more powerful paradigm making it
harder to grok (steeper learning curve). If you are someone that is already comfortable with reactive programming and doesn't
have to overcome that learning curve then `redux-observable` might be a good choice, but even then the power that
`redux-observable` provides is probably overkill for applications that just do simple request/response api calls. The power
of `redux-observable` really shines when you are working with more complex async like multiplexed web sockets, for example.

### Summary

For small applications that aren't highly data driven, using React's built in `setState()` will probably be perfectly fine.
Don't reach for more complex tools until you need them. For larger applications when you decide you want to use `redux` for
your state management, my preference is `redux-saga` middleware for my async operations. It has a nice separation of concerns
and has a reasonable learning curve (especially if you are already familiar with generators).
