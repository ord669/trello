import { boardService } from "../../services/board.service.local"
import { groupService } from "../../services/group.service.local"
import { store } from '../store'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_GROUP, REMOVE_GROUP, SET_BOARD, UNDO_REMOVE_GROUP, UPDATE_GROUP } from "./board.reducer"

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        if (!board) throw new Error('Board not found')
        console.log('board from DB:', board)
        store.dispatch({
            type: SET_BOARD,
            board
        })
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}

export async function removeGroup(groupId) {
    store.dispatch({ type: REMOVE_GROUP, groupId })
    try {
        const { board } = store.getState().boardModule
        await groupService.remove(board._id, groupId)
    } catch (err) {
        store.dispatch({ type: UNDO_REMOVE_GROUP, })
        console.log('Cannot remove group', err)
        throw err
    }
}

export async function saveGroup(group) {
    try {
        const type = (group.id) ? UPDATE_GROUP : ADD_GROUP
        const { board } = store.getState().boardModule
        const savedGroup = await groupService.save(board._id, group)
        store.dispatch({ type, group: savedGroup })
        return savedGroup
    } catch (err) {
        console.error('Cannot save group:', err)
        throw err
    }
}
