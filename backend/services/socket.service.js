const logger = require('./logger.service')

var gIo = null

function setupSocketAPI(http) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        logger.info(`New connected socket [id: ${socket.id}]`)
        socket.on('disconnect', socket => {
            logger.info(`Socket disconnected [id: ${socket.id}]`)
        })
        socket.on('drag-end', result => {
            const { source, destination } = result
            logger.info(`Task drag from group [id: ${source.droppableId}], to group [id:${destination.droppableId}]`)
            socket.broadcast.emit('update-drag-end', result)
        })
        socket.on('emit-save-task', task => {
            logger.info(`Task saved in group [${task.groupId}]`)
            socket.broadcast.emit('save-task', task)
        })
        socket.on('emit-remove-task', ({ groupId, taskId }) => {
            logger.info(`Task removed id [${taskId}] in group [${groupId}]`)
            socket.broadcast.emit('remove-task', taskId, groupId)
        })
        socket.on('emit-save-group', group => {
            logger.info(`Group saved [${group._id}]`)
            socket.broadcast.emit('save-group', group)
        })
        socket.on('emit-remove-group', ({ boardId, groupId }) => {
            logger.info(`Group [${groupId}] removed from board [${boardId}]`)
            socket.broadcast.emit('remove-group', groupId)
        })
        socket.on('emit-save-board', board => {
            logger.info(`board saved [${board._id}]`)
            socket.broadcast.emit('save-board', board)
        })
        socket.on('emit-remove-board', boardId => {
            logger.info(`board saved [${boardId}]`)
            socket.broadcast.emit('remove-board', boardId)
        })
        // socket.on('emit-assign-member', ({ userId, data }) => {
        //     logger.info(`assigning userId = ${userId} for task [id: ${userId}]`)
        //     emitToUser({ type: 'notify-member', data, userId })
        // })
    })
}

function emitTo({ type, data, label }) {
    if (label) gIo.to('watching:' + label.toString()).emit(type, data)
    else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
    userId = userId.toString()
    const socket = await _getUserSocket(userId)

    if (socket) {
        logger.info(`Emiting event: ${type} to user: ${userId} socket [id: ${socket.id}]`)
        socket.emit(type, data)
    } else {
        logger.info(`No active socket for user: ${userId}`)
        // _printSockets()
    }
}

async function broadcast({ type, data, room = null, userId }) {
    userId = userId.toString()

    logger.info(`Broadcasting event: ${type}`)
    const excludedSocket = await _getUserSocket(userId)
    if (room && excludedSocket) {
        logger.info(`Broadcast to room ${room} excluding user: ${userId}`)
        excludedSocket.broadcast.to(room).emit(type, data)
    } else if (excludedSocket) {
        logger.info(`Broadcast to all excluding user: ${userId}`)
        excludedSocket.broadcast.emit(type, data)
    } else if (room) {
        logger.info(`Emit to room: ${room}`)
        gIo.to(room).emit(type, data)
    } else {
        logger.info(`Emit to all`)
        gIo.emit(type, data)
    }
}

async function _getUserSocket(userId) {
    const sockets = await _getAllSockets()
    const socket = sockets.find(s => s.userId === userId)
    return socket
}
async function _getAllSockets() {
    const sockets = await gIo.fetchSockets()
    return sockets
}

async function _printSockets() {
    const sockets = await _getAllSockets()
    console.log(`Sockets: (count: ${sockets.length}):`)
    sockets.forEach(_printSocket)
}

function _printSocket(socket) {
    console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
}

module.exports = {
    // set up the sockets service and define the API
    setupSocketAPI,
    // emit to everyone / everyone in a specific room (label)
    emitTo,
    // emit to a specific user (if currently active in system)
    emitToUser,
    // Send to all sockets BUT not the current socket - if found
    // (otherwise broadcast to a room / to all)
    broadcast,
}
