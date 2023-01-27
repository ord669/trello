import { socketService, SOCKET_EMIT_SAVE_TASK } from '../../services/socket.service'
import { taskService } from '../../services/task.service'
import { dispatchBoard, saveGroup } from '../board/board.action'
import { store } from '../store'

export async function saveTask(task) {
    try {
        const { board } = store.getState().boardModule
        // socketService.emit(SOCKET_EMIT_SAVE_TASK, task)
        const savedTask = await taskService.save(task)
        console.log('savedTask:', savedTask);
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

export async function toggleTaskLabel(labelId, groupId, taskId) {
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
        return task
    } catch (err) {
        console.log('err from toggle task label', err)
        throw err
    }
}

export async function saveSocketTask(taskFromSocket) {
    try {
        const { board } = store.getState().boardModule
        const group = board.groups.find(group => group._id === taskFromSocket.groupId)
        let task = group.tasks.find(currTask => currTask._id === taskFromSocket._id)
        if (task) {
            // console.log('in');
            // task = taskFromSocket
            group.tasks = group.tasks.map(currTask => currTask._id !== taskFromSocket._id ? currTask : taskFromSocket)
        }
        else {
            group.tasks.push(taskFromSocket)
            group.tasksId.push(taskFromSocket._id)
        }
        dispatchBoard(board)
    } catch (err) {
        console.log('Err from saveTask in board action :', err)
        throw err
    }
}