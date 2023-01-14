import fetch from 'node-fetch'
export const handler = async (event) => {
    const GB_PATH = `http://www.giantbomb.com/api/search?api_key=${process.env.GIANTBOMBKEY}` +
    `&query=${event.queryStringParameters.search}&format=json`

    const response = await fetch(GB_PATH)

    const data = await response.json()

    return {
        headers: {
            'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: JSON.stringify(data.results.map(r => {
            return {
                id: r.id,
                title: r.name,
                year: r.original_release_date ? new Date(r.original_release_date).getFullYear() : null,
                poster: r.image.original_url,
                backdrop: r.image.screen_large_url,
                link: r.site_detail_url,
            }
        }))
    }
}
