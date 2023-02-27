const logger = require('../../services/logger.service')
const taskService = require('./task.service')

async function removeTask(req, res) {
    try {
        const { taskId } = req.params
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
    try {
        const task = req.body
        const addedTask = await taskService.add(task)
        res.send(addedTask)
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