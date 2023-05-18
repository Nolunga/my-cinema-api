const axios = require('axios')

module.exports = {
  getShowDetails: async (showId) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${showId}?api_key=1e5ff94f206cccc57ee88db7422ec433`
      )
      return data
    } catch (error) {
      throw error
    }
  },
  getEpisodeDetails: async () => {}
}
