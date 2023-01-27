// import { boardService } from "../../services/board.service.local"
import { boardService } from "../../services/board.service"
// import { socketService, SOCKET_EMIT_GROUP_DRAGED, SOCKET_EMIT_TASK_DRAGED } from "../../services/socket.service"
import { taskService } from "../../services/task.service"
import { utilService } from "../../services/util.service"
import { store } from '../store'

import { ADD_GROUP, REMOVE_GROUP, SET_BOARD, UNDO_REMOVE_GROUP, UPDATE_GROUP } from "./board.reducer"

export async function loadBoard(boardId, filterBy) {
    try {
        const board = await boardService.getById(boardId)
        if (!board) throw new Error('Board not found')
        // const filterdBoard = boardService.filterGroupsTasks(board, filterBy)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function removeGroup(groupId) {
    store.dispatch({ type: REMOVE_GROUP, groupId })
    const { board } = store.getState().boardModule
    try {
        await boardService.removeGroup(board, groupId)
    } catch (err) {
        store.dispatch({ type: UNDO_REMOVE_GROUP, })
        console.log('Err from removeGroup in board action :', err)
        throw err
    }
}

export async function saveGroup(group) {
    const type = (group._id) ? UPDATE_GROUP : ADD_GROUP
    const { board } = store.getState().boardModule
    try {
        const savedGroup = await boardService.saveGroup(board, group)
        store.dispatch({ type, group: savedGroup })
        return savedGroup
    } catch (err) {
        console.log('Err from saveGroup in board action :', err)
        throw err
    }
}

export async function saveBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        const newBoard = board._id ? board : savedBoard
        store.dispatch({ type: SET_BOARD, board: newBoard })
        return newBoard
    } catch (err) {
        console.log('Err from saveBoard in board action :', err)
        throw err
    }
}

export async function updateDrag({ source, destination, type }) {
    const { board } = store.getState().boardModule
    const update = type === 'TASK' ? taskService.reorderTasks : boardService.reorderGroups
    update(source, destination, board.groups)
    saveBoard({ ...board })
}

// export async function updateSocketDrag(board) {
//     store.dispatch({ type: SET_BOARD, board })
// }

export async function updateSocketDrag({ source, destination, type }) {
    const { board } = store.getState().boardModule
    const update = type === 'TASK' ? taskService.reorderTasks : boardService.reorderGroups
    update(source, destination, board.groups)
    store.dispatch({ type: SET_BOARD, board })
}

export async function dispatchBoard(board){
    console.log('board:', board);
    store.dispatch({ type: SET_BOARD, board })
}
