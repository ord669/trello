import { combineReducers, legacy_createStore as createStore } from 'redux'

import { userReducer } from './user.reducer.js'
import { systemReducer } from './system.reducer'
import { boardReducer } from './board/board.reducer'
import { modalReducer } from './modal/modal.reducer'
import { taskReducer } from './task/task.reducer'

const rootReducer = combineReducers({
    userModule: userReducer,
    systemModule: systemReducer,
    modalModule: modalReducer,
    boardModule: boardReducer,
    taskModule: taskReducer,
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })
