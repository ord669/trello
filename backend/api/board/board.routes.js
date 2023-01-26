const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getBoards, getBoardById, addBoard, updateBoard, removeBoard, addGroupToBoard, updateGroupInBoard, removeGroupFromBoard, getAiBoard } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getBoards)
router.get('/aiboard', log, getAiBoard)

router.get('/:boardId', getBoardById)
// router.post('/', requireAuth, addBoard)
router.post('/', addBoard)
router.put('/:boardId', updateBoard)
router.delete('/:boardId', removeBoard)

// router.post('/:boardId/group', addGroupToBoard)
// router.put('/:boardId/group', updateGroupInBoard)
router.delete('/:boardId/:groupId', removeGroupFromBoard)

// router.put('/:id', requireAuth, updateBoard)
// router.delete('/:id', requireAuth, removeBoard)
// router.delete('/:id', requireAuth, requireAdmin, removeBoard)

// router.post('/:id/msg', requireAuth, addBoardMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeBoardMsg)

module.exports = router