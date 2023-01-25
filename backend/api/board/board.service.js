const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const taskService = require('../task/task.service')

async function query(filterBy = { title: '' }) {
    try {
        // const criteria = _buildCriteria(filterBy)
        // console.log('criteria: ', criteria);
        const collection = await dbService.getCollection('board')
        const boards = await collection.find().toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ _id: ObjectId(boardId) })
        board.groups = await Promise.all(board.groups.map(async group => {
            const tasks = await Promise.all(group.tasksId.map(taskId => taskService.getById(taskId)))
            group.tasks = tasks
            return group
        }))
        // console.log('board:', board);
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ _id: ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}


async function add(board) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.insertOne(board)
        return board
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

async function update(board) {
    try {
        // const boardToSave = {
        //     title: board.title,
        //     background: board.background,
        //     isStarred: board.isStarred
        // }
        const boardToSave = { ...board }
        delete boardToSave._id 
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: ObjectId(board._id) }, { $set: boardToSave })
        return board
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}

async function removeGroupFromBoard(boardId, groupId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: ObjectId(boardId) }, { $pull: { 'groups': { '_id': groupId } } })
        return groupId
    } catch (err) {
        logger.error(`cannot remove group ${groupId}`, err)
        throw err
    }
}

async function addGroupToBoard(boardId, group) {
    try {
        group._id = utilService.makeId()
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: ObjectId(boardId) }, { $push: { 'groups': group } })
        return group
    } catch (err) {
        logger.error('cannot add group', err)
        throw err
    }
}

async function updateGroupToBoard(boardId, group) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: ObjectId(boardId), 'groups._id': group._id }, { $set: { 'groups.$': group } })
        return group
    } catch (err) {
        logger.error('cannot insert group', err)
        throw err
    }
}

// async function addTaskToGroup(task) {
//     try {
//         const collection = await dbService.getCollection('board')
//         await collection.updateOne({ _id: ObjectId(boardId), 'groups._id': task.groupId }, { $push: { 'tasksId': task._id } })
//     } catch (err) {
//         logger.error('cannot insert task id to group', err)
//         throw err
//     }
// }

// async function removeTaskFromGroup(boardId,groupId,taskId) {
//     try {
//         const collection = await dbService.getCollection('board')
//         await collection.updateOne({ _id: ObjectId(boardId), 'groups._id': groupId }, { $pull: { 'tasksId': taskId } })
//     } catch (err) {
//         logger.error(`cannot remove task id ${taskId} from group`, err)
//         throw err
//     }
// }


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.title !== 'undefined') criteria.title = filterBy.title
    return criteria
}



module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addGroupToBoard,
    updateGroupToBoard,
    removeGroupFromBoard,
    // addTaskToGroup,
    // removeTaskFromGroup,
}
