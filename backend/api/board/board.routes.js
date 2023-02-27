const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { getBoards, getBoardById, addBoard, updateBoard, removeBoard, removeGroupFromBoard, getAiBoard, getAiBgImg } = require('./board.controller')
const router = express.Router()

router.get('/', getBoards)

router.post('/aiimg', getAiBgImg)
router.post('/aiboard', getAiBoard)

router.get('/:boardId', getBoardById)
router.post('/', requireAuth, addBoard)
router.put('/:boardId', requireAuth, updateBoard)
router.delete('/:boardId', requireAuth, removeBoard)
router.delete('/:boardId/:groupId', requireAuth, removeGroupFromBoard)

module.exports = router