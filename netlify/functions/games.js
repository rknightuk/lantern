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

  const GB_PATH = `http://www.giantbomb.com/api/search?api_key=${process.env.GIANTBOMBKEY}` +
  `&query=${event.queryStringParameters.search}&format=json`

  const response = await fetch(GB_PATH)

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
