
import { store } from '../store'
import { OPEN_MODAL, CLOSE_MODAL, UPDATE_ELEMENT_SIZE, UPDATE_MODAL_POS, UPDATE_MODAL_TYPE } from "./modal.reducer"

export async function openDynamicModal({ ev, name, data, func, task, size }) {
    closeDynamicModal()

    if (ev) updateDynamicModalPos(ev.target.getBoundingClientRect())
    updateModalType({ name, func, data, task, size })

    // GET ELEMENT SIZE
    store.dispatch({ type: CLOSE_MODAL })
    store.dispatch({ type: OPEN_MODAL })
}

export async function closeDynamicModal() {
    store.dispatch({ type: CLOSE_MODAL })
}

export function updateDynamicModalPos(pos) {
    store.dispatch({ type: UPDATE_MODAL_POS, pos })
}

export function updateClickedElementSize(size) {
    store.dispatch({ type: UPDATE_ELEMENT_SIZE, size })
}

export function updateModalType(element) {
    store.dispatch({ type: UPDATE_MODAL_TYPE, element })
}

