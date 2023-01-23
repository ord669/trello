
import { store } from '../store'

import { SET_TASK } from "./task.reducer"

// export async function updatePos(pos) {
//     store.dispatch({ type: SET_MOUSE_POS, pos })

// }
export async function setTaskToEdit(currTask) {
    store.dispatch({ type: SET_TASK, currTask })
}