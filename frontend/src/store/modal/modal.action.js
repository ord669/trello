
import { store } from '../store'

import { SET_MOUSE_POS } from "./modal.reducer"

export async function updatePos(pos) {
    store.dispatch({ type: SET_MOUSE_POS, pos })

}
