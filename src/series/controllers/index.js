const database = require('../../database.js')
const { getShowDetails } = require('../services/index.js')

const now = new Date().toISOString()

module.exports = {
  addShow: (request, response) => {
    const { showId, userId } = request.body
    const createdAt = now
    const updatedAt = now

    return new Promise((resolve, reject) => {
      database.get(
        'SELECT * FROM shows WHERE userId =? AND showId=?;',
        [userId, showId],
        (error, rows) => {
          if (error) {
            return reject(error)
          }
          if (rows) {
            return reject('You have already added this show')
          }
          database.run(
            'INSERT INTO shows (createdAt,updatedAt,showId,userId) VALUES (?,?,?,?);',
            [createdAt, updatedAt, showId, userId],
            (error) => {
              if (error) {
                reject(error)
              }
              resolve(response.status(200).send('Success'))
            }
          )
        }
      )
    })
  },
  deleteShow: (request, response) => {
    const { showId, userId } = request.body
    return new Promise((resolve, reject) => {
      database.run(
        'DELETE FROM shows WHERE id=? and userId=?',
        [showId, userId],
        (result, error) => {
          if (error) {
            reject(error)
          }
          database.run(
            'DELETE FROM watched_episodes where showId=? and userId=?',
            [showId, userId],
            (error) => {
              if (error) {
                console.log({ error })
              }
            }
          )
          resolve(response.status(200).send('Success'))
        }
      )
    })
  },
  addEpisode: (request, response) => {
    const { showId, userId, episodeNumber, episodeId } = request.body
    const createdAt = now
    const updatedAt = now

    return new Promise((resolve, reject) => {
      database.get(
        'SELECT * FROM shows WHERE showId=? AND userId=?',
        [showId, userId],
        (error, row) => {
          if (error) {
            return reject(error)
          }
          if (!row) {
            database.run(
              'INSERT INTO shows (createdAt,updatedAt,showId,userId) VALUES (?,?,?,?);',
              [createdAt, updatedAt, showId, userId],
              (error) => {
                if (error) {
                  reject(error)
                }
              }
            )
          }
          database.get(
            'SELECT * FROM watched_episodes WHERE userId =? AND showId=? AND episodeId=?;',
            [userId, showId, episodeId],
            (error, row) => {
              if (error) {
                return reject(error)
              }
              if (row) {
                return reject('You have already added this show')
              }

              database.run(
                'INSERT INTO watched_episodes (createdAt,updatedAt,showId,episodeNumber,episodeId,userId) VALUES (?,?,?,?,?,?)',
                [
                  createdAt,
                  updatedAt,
                  showId,
                  episodeNumber,
                  episodeId,
                  userId
                ],
                (error) => {
                  if (error) {
                    reject(error)
                  }
                  resolve(response.status(200).send('Success'))
                }
              )
            }
          )
        }
      )
    })
  },
  myShows: (request, response) => {
    const { userId } = request.body
    return new Promise((resolve, reject) => {
      database.all(
        'SELECT * FROM shows WHERE userId =?;',
        [userId],
        async (error, rows) => {
          if (error) {
            reject(error)
          }
          const showsWithDetails = await Promise.all(
            rows.map(async (show) => {
              const showDetails = await getShowDetails(show.showId)
              // database.get(
              //   'SELECT * FROM watched_episodes WHERE userId=? AND showId=? ORDER BY episodeId DESC',
              //   [userId, show.showId],
              //   async (error, row) => {
              //     console.log({ error, row })
              // const nextEpisode = await getEpisodeDetails()
              return {
                dbId: show.id,
                ...showDetails
                // nextEpisode
              }
              // }
              // )
            })
          )
          resolve(response.status(200).send(showsWithDetails))
        }
      )
    })
  },
  watchedEpisodes: (request, response) => {
    const { userId, showId } = request.body
    return new Promise((resolve, reject) => {
      database.all(
        'SELECT * FROM watched_episodes WHERE userId =? AND showId=?',
        [userId, showId],
        async (error, rows) => {
          if (error) {
            console.log({ error })
            reject(error)
          }
          resolve(response.status(200).send(rows))
        }
      )
    })
  }
}
