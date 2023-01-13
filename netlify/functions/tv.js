import fetch from 'node-fetch'

export const handler = async (event) => {
  const TMDB_PATH = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.MOVIEDBKEY}` +
  `&query=${event.queryStringParameters.search}`

  const response = await fetch(TMDB_PATH)

  const data = await response.json()

  return {
    statusCode: 200,
    body: JSON.stringify(data.results)
  }
}
