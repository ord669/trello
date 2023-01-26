const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')
// const boardService = require('../board/board.service')

async function getById(taskId) {
    console.log('taskId: ', taskId);
    try {
        const collection = await dbService.getCollection('task')
        const task = await collection.findOne({ _id: ObjectId(taskId) })
        console.log('task: ', task);
        // task._id = taskId
        return task
    } catch (err) {
        logger.error(`while finding task ${taskId}`, err)
        throw err
    }
}
async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('task')
        const tasks = await collection.find(criteria).toArray()
        return tasks
    } catch (err) {
        logger.error('cannot find tasks', err)
        throw err
    }

}
async function remove(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        await collection.deleteOne({ _id: ObjectId(taskId) })
        return taskId
    } catch (err) {
        logger.error(`cannot remove task ${taskId}`, err)
        throw err
    }
}

async function update(task) {
    try {
        const taskToUpdate = { ...task }
        delete taskToUpdate._id  //need to change this
        const collection = await dbService.getCollection('task')
        await collection.updateOne({ _id: ObjectId(task._id) }, { $set: taskToUpdate })
        return task
    } catch (err) {
        logger.error(`cannot update task ${task._id}`, err)
        throw err
    }
}

async function add(task) {
    try {
        const collection = await dbService.getCollection('task')
        await collection.insertOne(task)
        return task
    } catch (err) {
        logger.error('cannot insert task', err)
        throw err
    }
}

async function addTaskToGroup(boardId, task) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: ObjectId(boardId), 'groups._id': task.groupId }, { $push: { 'tasksId': task._id } })
    } catch (err) {
        logger.error('cannot insert task id to group', err)
        throw err
    }
}

async function removeTaskFromGroup(boardId, groupId, taskId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: ObjectId(boardId), 'groups._id': groupId }, { $pull: { 'tasksId': taskId } })
    } catch (err) {
        logger.error(`cannot remove task id ${taskId} from group`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.title) criteria.title = filterBy.title
    return criteria
}

module.exports = {
    query,
    remove,
    add,
    update,
    getById
}
