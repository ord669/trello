import { socketService, SOCKET_EMIT_REMOVE_TASK, SOCKET_EMIT_SAVE_TASK, } from '../../services/socket.service'
import { taskService } from '../../services/task.service'
import { dispatchBoard, saveGroup } from '../board/board.action'
import { TOGGLE_LABEL_SIZE } from '../board/board.reducer'
import { openDynamicModal } from '../modal/modal.action'
import { store } from '../store'

export async function saveTask(task) {
    try {
        const { board } = store.getState().boardModule
        const savedTask = await taskService.save(task)
        socketService.emit(SOCKET_EMIT_SAVE_TASK, savedTask)
        const group = board.groups.find(group => group._id === task.groupId)
        if (task._id) {
            group.tasks = group.tasks.map(currTask => currTask._id !== savedTask._id ? currTask : savedTask)
        }
        else {
            group.tasks.push(savedTask)
            group.tasksId.push(savedTask._id)
        }
        saveGroup(group)
        return savedTask
    } catch (err) {
        console.log('Err from saveTask in board action :', err)
        throw err
    }
}

export async function removeTask(task) {
    const { groupId, _id: taskId } = task
    if (!groupId || !taskId) return
    try {
        const { board } = store.getState().boardModule
        await taskService.remove(taskId)
        socketService.emit(SOCKET_EMIT_REMOVE_TASK, { groupId, taskId })
        const group = board.groups.find(group => group._id === groupId)
        group.tasks = group.tasks.filter(task => task._id !== taskId)
        group.tasksId = group.tasksId.filter(id => id !== taskId)
        saveGroup(group)
    } catch (err) {
        console.log('Err from removeTask in board action :', err)
        throw err
    }
}

export async function toggleMemberAssigned(memberId, groupId, taskId) {
    const { board: boardToUpdate } = store.getState().boardModule
    const group = boardToUpdate.groups.find(group => group._id === groupId)
    const task = group.tasks.find(task => task._id === taskId)

    if (task.memberIds.includes(memberId)) {
        task.memberIds = task.memberIds.filter(member => member !== memberId)
    } else {
        task.memberIds.push(memberId)
    }
    try {
        saveTask(task)
    } catch (err) {
        console.log('err error from toggle members', err)
        throw err
    }
}

export async function toggleTaskLabel(labelId, groupId, taskId, refresh) {
    const { board } = store.getState().boardModule
    const group = board.groups.find(group => group._id === groupId)
    const task = group.tasks.find(task => task._id === taskId)

    if (task.labelIds.includes(labelId)) {
        task.labelIds = task.labelIds.filter(currLabelId => currLabelId !== labelId)
    } else {
        task.labelIds.push(labelId)
    }
    try {
        saveTask(task)
        if (refresh) refreshModal(task)
        return task
    } catch (err) {
        console.log('err from toggle task label', err)
        throw err
    }
}

export function toggleLabelSize() {
    store.dispatch({ type: TOGGLE_LABEL_SIZE })
}

export async function saveSocketTask(taskFromSocket) {
    try {
        const { board } = store.getState().boardModule
        const group = board.groups.find(group => group._id === taskFromSocket.groupId)
        let task = group.tasks.find(currTask => currTask._id === taskFromSocket._id)
        if (task) {
            group.tasks = group.tasks.map(currTask => currTask._id !== taskFromSocket._id ? currTask : taskFromSocket)
        }
        else {
            group.tasks.push(taskFromSocket)
            group.tasksId.push(taskFromSocket._id)
        }
        dispatchBoard(board)
    } catch (err) {
        console.log('Err from saveSocketTask in board action :', err)
        throw err
    }
}

export async function removeSocketTask(taskId, groupId) {
    try {
        const { board } = store.getState().boardModule
        const group = board.groups.find(group => group._id === groupId)
        group.tasks = group.tasks.filter(task => task._id !== taskId)
        group.tasksId = group.tasksId.filter(id => id !== taskId)
        dispatchBoard(board)
    } catch (err) {
        console.log('Err from removeSocketTask in board action :', err)
        throw err
    }
}

function refreshModal(task) {
    openDynamicModal({ name: 'labels', task })
}