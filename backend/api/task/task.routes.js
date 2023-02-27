const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { addTask, removeTask, updateTask } = require('./task.controller')
const router = express.Router()

router.post('/', log, requireAuth, addTask)
router.put('/:taskId', requireAuth, updateTask)
router.delete('/:taskId', requireAuth, removeTask)

module.exports = router