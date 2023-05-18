const sqlite3 = require('sqlite3').verbose()

const database = new sqlite3.Database('./my-cinema.db')

/**
 *
 */
const createUserTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS user(
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      email text UNIQUE,
      password text
    )`
  return database.run(query)
}

createUserTable()

/**
 *
 */
const createShowsTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS shows(
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      userId integer,
      showId integer
    )`
  return database.run(query)
}

createShowsTable()

const createWatchedSeriesEpisodes = () => {
  const query = `CREATE TABLE IF NOT EXISTS watched_episodes(
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    userId integer,
    showId integer,
    episodeNumber integer,
    episodeId integer
  )`
  return database.run(query)
}

createWatchedSeriesEpisodes()

module.exports = database
