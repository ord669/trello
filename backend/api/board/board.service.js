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

async function getById(boardId, filterBy) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ _id: ObjectId(boardId) })
        board.groups = await Promise.all(board.groups.map(async group => {
            // const tasks = await Promise.all(group.tasksId.map(taskId => taskService.getById(taskId)))
            // group.tasks = tasks
            // return group
            filterBy.groupId = group._id
            const tasks = await taskService.query(filterBy)
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

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.title !== 'undefined') criteria.title = filterBy.title
    return criteria
}

async function getAiImg(prompt) {
    return await dbService.getImgFromDal(prompt)

}

async function getAiBoardFromChat(prompt) {
    console.log('prompt: ', prompt);
    try {
        const script = await dbService.getBoardScript(prompt)
        const lines = script.split('\n')

        console.log('group23222222323231232342343242342323423423423423324s: ', lines)
        const groups = lines.reduce((acc, line) => {
            if (line.includes('$') && !line.includes('Object')) {
                const group = { groupTitle: _removeSpecialChars(line), tasks: [] }
                acc.push(group)
            } else if (line.includes('∞')) {
                const task = { taskTitle: _removeSpecialChars(line) }
                acc[acc.length - 1].tasks.push(_removeSpecialChars(line))
            }
            return acc
        }, [])
        var counter = 0
        const newGroups = await Promise.all(groups.map(async group => {
            const newGroup = _createAiGroup(group.groupTitle)
            newGroup.tasksId = await Promise.all(group.tasks.map(async (task, idx) => {

                const taskFromMongo = await Promise.resolve(taskService.add(_createAiTask(task, newGroup._id,
                    Math.floor((Math.random() * 2)) === 0 ? colors[counter++] : images[counter++]
                )))
                return taskFromMongo._id
            }))
            return newGroup
        }))
        const aiBoard = _createAiBoard(`${prompt.prompt}`, newGroups)
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
            "background": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2068&q=80"
        },
        members: [{
            _id: "u101",
            fullname: "Or Dvir",
            username: "Or Dvir",
            imgUrl: "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674737130/Me_q1h5fa.jpg"
        },
        {
            _id: "u102",
            fullname: "Liad Gola",
            username: "Liad Gola",
            imgUrl: "https://res.cloudinary.com/dug85f2rg/image/upload/v1674737415/liad_tveksl.jpg"
        },
        {
            _id: "u103",
            fullname: "Oren Sharizad",
            username: "Oren Sharizad",
            imgUrl: "https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674479066/main_aq4l31.jpg"
        }],
    }
}
function _createAiGroup(title) {
    return {
        _id: utilService.makeId(),
        title,
        tasksId: [],
        style: {},
        archivedAt: null
    }
}

function _createAiTask(title, groupId, background) {
    if (!background) background = ''
    return {
        "title": title,
        "archivedAt": Date.now(),
        "description": "",
        "comments": [],
        "checklists": [],
        "memberIds": [],
        "labelIds": [],
        "dueDate": null,
        "isDone": false,
        "byMember": {
            "_id": "u103",
            "username": "Oren Sharizad",
            "fullname": "Oren Sharizad",
            "imgUrl": "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674737130/Me_q1h5fa.jpg"
        },
        "style": {
            background
        },
        "attachments": [],
        "activity": [],
        groupId,
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const images = [
    'https://res.cloudinary.com/dd09wjwjn/image/upload/v1674723476/wrfbuvied7bglma8gwnj.jpg',
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932365/Software-Development_nwvt9b.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932362/photo-1610563166150-b34df4f3bcd6_xcihun.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932360/Software-Development_1_u9hzft.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932361/Software-Development-Industry_yguihk.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932361/origin_hmen7v.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932360/software-development-business-process-automation-internet-technology-concept-virtual-screen-software-development-143587196_dll8zz.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932209/Top-6-Software-Development-Methodologies_lj1l9n.jpg",
    'https://res.cloudinary.com/dd09wjwjn/image/upload/v1674724392/nsdjkvajunibmxzwuc7d.png',
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932392/clarity-software-development-architecture_xnjvxl.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932380/Software-development_u0ardw.png",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932360/software-development-and-coding-landing-page_yeo8em.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932368/Your-perfect-development-team-1_kmd8c5.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932366/software-development_2_vtkrg9.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932366/Types-of-Software-Development_xntc98.webp",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932362/Software-Development-Contract_yzckea.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932362/Software-development-skills-to-learn-in-2022_fmddxi.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932360/Career-as-a-software-developer_j2hrke.png",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932359/9-types-of-software-development_oehfpg.jpg",
    "https://res.cloudinary.com/dd09wjwjn/image/upload/v1674932359/images_antr8v.png",
]

const colors = ['#0279C0', '#D29034', '#529839', '#B04632', '#89609E', '#CD5A91', '#4ABF6A', '#06AECC', '#838C91', '#172b4d', '#8c7d20', '#151514', '#0d3728', '#e8e19d', '#f6d5d8', '#e7baa8', '#fdd298']

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    removeGroupFromBoard,
    getAiBoardFromChat,
    getAiImg,
}
