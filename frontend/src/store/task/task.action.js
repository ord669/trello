import { taskService } from '../../services/task.service.local'
import { saveGroup } from '../board/board.action'
import { store } from '../store'

export async function saveTask(task) {
    try {
        const { board } = store.getState().boardModule
        const savedTask = await taskService.save(task)
        const group = board.groups.find(group => group._id === task.groupId)
        console.log('group:', group)
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
    console.log('groupId: ', groupId);
    console.log('taskId: ', taskId);
    if (!groupId || !taskId) return
    try {
        const { board } = store.getState().boardModule
        const removedTaskId = await taskService.remove(taskId)
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
    } catch (err) {
        console.log('err from toggle task label', err)
        throw err
    }
}