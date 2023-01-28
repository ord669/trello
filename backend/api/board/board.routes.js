const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getBoards, getBoardById, addBoard, updateBoard, removeBoard, removeGroupFromBoard, getAiBoard, getAiBgImg } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getBoards)
router.post('/aiimg', log, getAiBgImg)
router.post('/aiboard', log, getAiBoard)

router.get('/:boardId', getBoardById)
// router.post('/', addBoard)
// router.put('/:boardId', updateBoard)
// router.delete('/:boardId', removeBoard)
// router.delete('/:boardId/:groupId', removeGroupFromBoard)

router.post('/', requireAuth, addBoard)
router.put('/:boardId', requireAuth, updateBoard)
router.delete('/:boardId', requireAuth, removeBoard)
router.delete('/:boardId/:groupId', requireAuth, removeGroupFromBoard)

module.exports = router