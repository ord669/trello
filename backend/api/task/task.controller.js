const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const taskService = require('./task.service')

async function removeTask(req, res) {
    try {
        const taskId = req.params.id
        const removedId = await taskService.remove(taskId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove task', err)
        res.status(500).send({ err: 'Failed to remove task' })
    }
}

async function updateTask(req, res) {
    try {
        const task = req.body
        const updatedTask = await taskService.update(task)
        res.json(updatedTask)
    } catch (err) {
        logger.error('Failed to update task', err)
        res.status(500).send({ err: 'Failed to update task' })

    }
}

async function addTask(req, res) {

    // const { loggedinUser } = req

    try {
        let task = req.body
        // task.byUserId = loggedinUser._id
        task = await taskService.add(task)

        // prepare the updated review for sending out
        // task.aboutUser = await userService.getById(task.aboutUserId)

        // Give the user credit for adding a review
        // var user = await userService.getById(review.byUserId)


        // loggedinUser = await userService.update(loggedinUser)
        // task.byUser = loggedinUser

        // User info is saved also in the login-token, update it
        // const loginToken = authService.getLoginToken(loggedinUser)
        // res.cookie('loginToken', loginToken)

        // delete task.aboutUserId
        // delete task.byUserId

        // socketService.broadcast({ type: 'review-added', data: task, userId: loggedinUser._id })
        // socketService.emitToUser({ type: 'review-about-you', data: task, userId: task.aboutUser._id })

        // const fullUser = await userService.getById(loggedinUser._id)
        // socketService.emitTo({ type: 'user-updated', data: fullUser, label: fullUser._id })

        res.send(task)

    } catch (err) {
        logger.error('Failed to add task', err)
        res.status(500).send({ err: 'Failed to add task' })
    }
}

module.exports = {
    removeTask,
    updateTask,
    addTask
}