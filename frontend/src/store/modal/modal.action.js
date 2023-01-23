
import { store } from '../store'

import { OPEN_MODAL, CLOSE_MODAL, UPDATE_POS, UPDATE_ELEMENT_SIZE } from "./modal.reducer"

// export async function updatePos(pos) {
//     store.dispatch({ type: SET_MOUSE_POS, pos })

// }
export async function openDynamicModal(ev) {
    console.log('ev: ', ev);
    // GET MOUSE CLICK POS
    updateDynamicModalPos({ x: ev.pageX, y: ev.pageY })
    // GET ELEMENT SIZE
    const size = { width: ev.currentTarget.offsetWidth, height: ev.currentTarget.offsetHeight }

    updateClickedElementSize(size)

    store.dispatch({ type: CLOSE_MODAL, status: false })
    store.dispatch({ type: OPEN_MODAL, status: true })
}

export async function closeDynamicModal() {
    store.dispatch({ type: CLOSE_MODAL, status: false })
}
export function updateDynamicModalPos(pos) {
    store.dispatch({ type: UPDATE_POS, pos })
}
export function updateClickedElementSize(size) {
    store.dispatch({ type: UPDATE_ELEMENT_SIZE, size })
}