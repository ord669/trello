import { userService } from '../../services/user.service.js'

export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'

const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        default:
    }
    return newState

}
