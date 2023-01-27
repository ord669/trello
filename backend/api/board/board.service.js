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
        const boardToSave = JSON.parse(JSON.stringify((board)))
        // const boardToSave = structuredClone(board)
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

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.title !== 'undefined') criteria.title = filterBy.title
    return criteria
}

async function getAiBoardFromChat(prompt) {
    try {
        const script = await dbService.getBoardScript(prompt)
        const lines = script.split('\n')
        const groups = lines.reduce((acc, line) => {
            if (line.includes('$')) {
                const group = { groupTitle: _removeSpecialChars(line), tasks: [] }
                acc.push(group)
            } else if (line.includes('∞')) {
                const task = { taskTitle: _removeSpecialChars(line) }
                // acc[acc.length - 1].tasks.push(task)
                acc[acc.length - 1].tasks.push(_removeSpecialChars(line))
            }
            return acc
        }, [])
        console.log('groups: ', groups)

        const newGroups = groups.map(group => {
            const newGroup = _createAiGroup(group.groupTitle)

            group.tasks.forEach(async task => {
                const taskFromMongo = await taskService.add(_createAiTask(task, newGroup._id))
                newGroup.tasksId.push(taskFromMongo._id)
            })
            return newGroup
        })
        const aiBoard = _createAiBoard('Ai Board', newGroups)

        const aiBoardWithId = await add(aiBoard)
        return await getById(aiBoardWithId._id)

    } catch (err) {
        console.log('err from getiin ai in board sevice', err)
        throw err
    }
}

function _removeSpecialChars(str) {
    return str.replace(/(?!\w|\s)./g, '')
        .replace(/\s+/g, ' ')
        .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2')
}

function _createAiBoard(title, groups = []) {
    return {
        title,
        isstarred: false,
        archivedAt: null,
        createdBy: {
            _id: "u101",
            fullname: "Or Dvir",
            imgUrl: "https://robohash.org/Or?set=set5"
        },
        groups,
        activities: [],
        labels: [
            {
                "_id": "l101",
                "title": "Done",
                "color": "#d6ecd2"
            },
            {
                "_id": "l102",
                "title": "Progress",
                "color": "#fbf3c0"
            },
            {
                "_id": "l103",
                "title": "Todo",
                "color": "#fce7c6"
            },
            {
                "_id": "l104",
                "title": "Important",
                "color": "#f5d3ce"
            },
            {
                "_id": "l105",
                "title": "Urgent",
                "color": "#efb3ab"
            },
            {
                "_id": "l106",
                "title": "Later",
                "color": "#dfc0eb"
            },
            {
                "_id": "l107",
                "title": "Basic",
                "color": "#e4f0f6"
            }
        ],
        style: {
            "background": "https://res.cloudinary.com/dsvs2bgn4/image/upload/v1673811922/samples/landscapes/architecture-signs.jpg"
        },
        members: [{
            _id: "u101",
            fullname: "Or Dvir",
            username: "Or Dvir",
            imgUrl: "https://robohash.org/Or?set=set5"
        },
        {
            _id: "u102",
            fullname: "Liad Gola",
            username: "Liad Gola",
            imgUrl: "https://robohash.org/Liad?set=set5"
        },
        {
            _id: "u103",
            fullname: "Oren Sharizad",
            username: "Oren Sharizad",
            imgUrl: "https://robohash.org/oren?set=set5"
        }],
        cmpsOrder: [],
    }
}
function _createAiGroup(title) {
    return {
        _id: utilService.makeId(),
        title,
        tasksId: [],
        tasks: [],
        style: {},
        archivedAt: null
    }
}

function _createAiTask(title, groupId) {
    return {
        "title": title,
        "archivedAt": Date.now(),
        "description": "",
        "comments": [],
        "checklists": [],
        "memberIds": [
            "u102"
        ],
        "labelIds": [
            "l104"
        ],
        "dueDate": null,
        "isDone": false,
        "byMember": {
            "_id": "u103",
            "username": "Oren Sharizad",
            "fullname": "Oren Sharizad",
            "imgUrl": "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674737130/Me_q1h5fa.jpg"
        },
        "style": {
            "background": "#26DE81"
        },
        "attachments": [],
        "activity": [],
        groupId,
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    // addGroupToBoard,
    // updateGroupToBoard,
    removeGroupFromBoard,
    getAiBoardFromChat,
    // addTaskToGroup,
    // removeTaskFromGroup,
}
