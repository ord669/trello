
import { utilService } from '../../services/util.service'
import { store } from '../store'

import { OPEN_MODAL, CLOSE_MODAL, UPDATE_POS, UPDATE_ELEMENT_SIZE, UPDATE_CLICKED_POS, UPDATE_MODAL_POS, UPDATE_MODAL_TYPE } from "./modal.reducer"

// export async function updatePos(pos) {
//     store.dispatch({ type: SET_MOUSE_POS, pos })

// }
export async function openDynamicModal({ ev, name, data, func, task, size }) {
    console.log('size: ', size);
    const { target } = ev

    // GET Element POS
    updateDynamicModalPos(target.getBoundingClientRect())
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
// export function updateClickedPos(clickedPos) {
//     store.dispatch({ type: UPDATE_CLICKED_POS, clickedPos })
// }

export function quickEdit(ev, task) {
    const quickEditModalPos = ev.target.getBoundingClientRect()

    // store.dispatch({ type: UPDATE_MODAL_TYPE, element })
}
