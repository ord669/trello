import { combineReducers, legacy_createStore as createStore } from 'redux'

import { carReducer } from './car.reducer.js'
import { userReducer } from './user.reducer.js'
import { reviewReducer } from './review.reducer'
import { systemReducer } from './system.reducer'
import { boardReducer } from './board/board.reducer'

const rootReducer = combineReducers({
    carModule: carReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
    boardModule: boardReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



