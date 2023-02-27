const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function getById(taskId) {
    try {
        const collection = await dbService.getCollection('task')
        const task = await collection.findOne({ _id: ObjectId(taskId) })
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
        const tasks = await collection.aggregate([
            {
                $match: criteria
            },
        ]).toArray()
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
        const taskToUpdate = JSON.parse(JSON.stringify((task)))
        delete taskToUpdate._id
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

function _buildCriteria(filterBy) {
    const criteria = {}
    criteria.groupId = filterBy.groupId
    if (filterBy.title !== "undefined") criteria.title = { $regex: filterBy.title, $options: 'i' }
    if (filterBy.memberIds !== 'undefined' && filterBy.memberIds !== '') {
        criteria.memberIds = { $in: filterBy.memberIds.split(',') }
    }
    return criteria
}

module.exports = {
    query,
    remove,
    add,
    update,
    getById
}
