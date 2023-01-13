import fetch from 'node-fetch'
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

export const handler = async (event) => {
if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
    }
  }

  const TMDB_PATH = `https://api.themoviedb.org/3/search/${event.queryStringParameters.type}?api_key=${process.env.MOVIEDBKEY}` +
  `&query=${event.queryStringParameters.search}`

  const response = await fetch(TMDB_PATH)

  const data = await response.json()

  return {
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    body: JSON.stringify(data.results)
  }
}
