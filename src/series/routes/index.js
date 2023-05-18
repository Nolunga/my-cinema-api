const router = require('express').Router()
const authMiddleware = require('../../middleware/authMiddleware')
const {
  addShow,
  myShows,
  deleteShow,
  addEpisode,
  watchedEpisodes
} = require('../controllers')

/**
 *
 */
router.post('/add-show', authMiddleware, async (request, response) => {
  return addShow(request, response)
})

/**
 *
 */
router.get('/my-shows', authMiddleware, async (request, response) => {
  return myShows(request, response)
})

router.post('/delete-show', authMiddleware, async (request, response) => {
  return deleteShow(request, response)
})
router.post('/add-episode', authMiddleware, async (request, response) => {
  return addEpisode(request, response)
})
router.post('/watched-episodes', authMiddleware, async (request, response) => {
  return watchedEpisodes(request, response)
})

module.exports = router
