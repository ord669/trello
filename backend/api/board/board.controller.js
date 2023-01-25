const boardService = require('./board.service.js')

const logger = require('../../services/logger.service')

async function getBoards(req, res) {
  try {
    logger.debug('Getting Boards')
    const filterBy = {
      title: req.query.txt
    }
    const boards = await boardService.query(filterBy)
    res.json(boards)
  } catch (err) {
    logger.error('Failed to get boards', err)
    res.status(500).send({ err: 'Failed to get boards' })
  }
}

async function getBoardById(req, res) {
  try {
    const { boardId } = req.params
    const board = await boardService.getById(boardId)
    res.json(board)
  } catch (err) {
    logger.error('Failed to get board', err)
    res.status(500).send({ err: 'Failed to get board' })
  }
}

async function addBoard(req, res) {
  // const { loggedinUser } = req
  try {
    const board = req.body
    // board.owner = loggedinUser
    const addedBoard = await boardService.add(board)
    res.json(addedBoard)
  } catch (err) {
    logger.error('Failed to add board', err)
    res.status(500).send({ err: 'Failed to add board' })
  }
}

async function updateBoard(req, res) {
  console.log('in');
  try {
    const board = req.body
    const updatedBoard = await boardService.update(board)
    res.json(updatedBoard)
  } catch (err) {
    logger.error('Failed to update board', err)
    res.status(500).send({ err: 'Failed to update board' })

  }
}

async function removeBoard(req, res) {
  try {
    const { boardId } = req.params
    const removedId = await boardService.remove(boardId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove board', err)
    res.status(500).send({ err: 'Failed to remove board' })
  }
}

async function removeGroupFromBoard(req, res) {
  try {
    const { boardId, groupId } = req.params
    const removedId = await boardService.removeGroupFromBoard(boardId, groupId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove board', err)
    res.status(500).send({ err: 'Failed to remove board' })
  }
}

async function addGroupToBoard(req, res) {
  try {
    const { boardId } = req.params
    const group = req.body
    const updatedGroup = await boardService.addGroupToBoard(boardId, group)
    res.json(updatedGroup)
  } catch (err) {
    logger.error('Failed to add group', err)
    res.status(500).send({ err: 'Failed to add group' })
  }
}

async function updateGroupInBoard(req, res) {
  try {
    const { boardId } = req.params
    const group = req.body
    const updatedGroup = await boardService.updateGroupToBoard(boardId, group)
    res.json(updatedGroup)
  } catch (err) {
    logger.error('Failed to add group', err)
    res.status(500).send({ err: 'Failed to add group' })
  }
}
async function getAiBoard(req, res) {
  // console.log('res: ', res);
  console.log('in get from :')
  try {
    logger.debug('Getting Boards')
    const aiBoards = await boardService.getAiBoardFromChat()
    console.log('aiBoards: ', aiBoards);
    res.json(aiBoards)
  } catch (err) {
    logger.error('Failed to get ai board  from controller', err)
    res.status(500).send({ err: 'Failed to get ai board from controller' })
  }
}

module.exports = {
  getBoards,
  getBoardById,
  addBoard,
  updateBoard,
  removeBoard,
  removeGroupFromBoard,
  addGroupToBoard,
  updateGroupInBoard,
  getAiBoard,
}
