const API_HOST = 'https://nodequery-atlinbing.cloud.okteto.net'

const hosts = async () => {
    const response = await fetch(`${API_HOST}/hosts`)
    const data = await response.json()
    return data['data']
}

const host = async (hostId) => {
    const response = await fetch(`${API_HOST}/host/${hostId}`)
    const data = await response.json()
    return data['data']
}
export {hosts, host}