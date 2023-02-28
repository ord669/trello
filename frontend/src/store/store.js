import { combineReducers, legacy_createStore as createStore } from 'redux'

import { userReducer } from './user/user.reducer.js'
import { boardReducer } from './board/board.reducer'
import { modalReducer } from './modal/modal.reducer'

const rootReducer = combineReducers({
    userModule: userReducer,
    modalModule: modalReducer,
    boardModule: boardReducer,
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

