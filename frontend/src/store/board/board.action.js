// import { boardService } from "../../services/board.service.local"
import { boardService } from "../../services/board.service"
import { socketService, SOCKET_EMIT_REMOVE_GROUP, SOCKET_EMIT_SAVE_BOARD, SOCKET_EMIT_SAVE_GROUP } from "../../services/socket.service"
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
        socketService.emit(SOCKET_EMIT_REMOVE_GROUP, { boardId: board._id, groupId })
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
        socketService.emit(SOCKET_EMIT_SAVE_GROUP, savedGroup)
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
        socketService.emit(SOCKET_EMIT_SAVE_BOARD, savedBoard)
        store.dispatch({ type: SET_BOARD, board: savedBoard })
        return savedBoard
        // const newBoard = board._id ? board : savedBoard
        // store.dispatch({ type: SET_BOARD, board: newBoard })
        // return newBoard
    } catch (err) {
        console.log('Err from saveBoard in board action :', err)
        throw err
    }
}

export async function createAiBoard(txt) {

    if (!txt) return
    const prompt = { prompt: txt }
    try {
        const newBoard = await boardService.createAiBoard(prompt)
        console.log('newBoard from create: ', newBoard)
        store.dispatch({ type: SET_BOARD, board: newBoard })
        return newBoard
    } catch (err) {
        console.log('Err from getboard ai in board action :', err)
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

export async function saveSocketGroup(socketGroup) {
    const { board } = store.getState().boardModule
    try {
        const group = board.groups.find(group => group._id === socketGroup._id)
        const type = group ? UPDATE_GROUP : ADD_GROUP
        store.dispatch({ type, group: socketGroup })
    } catch (err) {
        console.log('Err from saveGroup in board action :', err)
        throw err
    }
}

export async function removeSocketGroup(groupId) {
    console.log('groupId:', groupId)
    store.dispatch({ type: REMOVE_GROUP, groupId })
}

export async function dispatchBoard(board) {
    store.dispatch({ type: SET_BOARD, board })
}

export async function saveActivity({ board, txt, type, at, diff, task }) {
    const activity = {
        _id: utilService.makeId(),
        byMember: {
            "_id": "u101",
            "fullname": "Or Dvir",
            "imgUrl": "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674737130/Me_q1h5fa.jpg"
        },
        createdAt: Date.now(),
        diff,
        type,
        txt,
        at,
        task

    }
    console.log(' activity:', activity)
    const boardToSave = { ...board, activities: [activity, ...board.activities] }
    try {
        await saveBoard(boardToSave)
    } catch (err) {
        console.log('cannot save activity', err)
    }
}