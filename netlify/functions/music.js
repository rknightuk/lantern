import fetch from 'node-fetch'
export const handler = async (event) => {
    const type = event.queryStringParameters.type
    const query = event.queryStringParameters.search
    const LFM_PATH = `https://ws.audioscrobbler.com/2.0/?method=${type}.search&${type}=${query}` +
    `&api_key=${process.env.LASTFMKEY}&format=json`


    const response = await fetch(LFM_PATH)

    const data = await response.json()

    return {
        headers: {
            'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: JSON.stringify(data.results[`${type}matches`][type].map((r, i) => {
            let image = r.image.pop()
            if (image) image = image['#text']
            if (type !== 'album') image = null
            const title = type === 'artist' ? r.name : `${r.name} - ${r.artist}`
            return {
                id: `lastfm-${type}-${i+1}`,
                title: title,
                year: null,
                poster: image,
                backdrop: image,
                link: r.url,
            }
        }))
    }
}
