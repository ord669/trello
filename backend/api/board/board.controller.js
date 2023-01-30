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
    const filterBy = {
      title: req.query.title,
      memberIds: req.query.memberIds
    }
    console.log('filterBy from board controller: ', filterBy);

    const { boardId } = req.params
    const board = await boardService.getById(boardId, filterBy)
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
    console.log('addedBoard:', addedBoard);
    res.json(addedBoard)
  } catch (err) {
    logger.error('Failed to add board', err)
    res.status(500).send({ err: 'Failed to add board' })
  }
}

async function updateBoard(req, res) {
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

async function getAiBoard(req, res) {
  console.log(' req.body: ', req.body);
  const { prompt } = req.body
  console.log('prompt: ', prompt);

  try {
    logger.debug('Getting Boards')
    console.log('prompt: ', prompt);

    const aiBoards = await boardService.getAiBoardFromChat(prompt)
    console.log('aiBoards: ', aiBoards);
    res.json(aiBoards)
  } catch (err) {
    logger.error('Failed to get ai board  from controller', err)
    res.status(500).send({ err: 'Failed to get ai board from controller' })
  }
}

async function getAiBgImg(req, res) {
  const { prompt } = req.body
  console.log('prompt: ', prompt);
  try {
    const img = await boardService.getAiImg(prompt)

    res.json(img)
  } catch (err) {
    console.log('err', err)
  }
}

module.exports = {
  getBoards,
  getBoardById,
  addBoard,
  updateBoard,
  removeBoard,
  removeGroupFromBoard,
  getAiBoard,
  getAiBgImg,
}
