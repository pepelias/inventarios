export const request = async (url, config = {}) => {
  if (config.body) config.body = JSON.stringify(config.body)
  if (!config.headers) config.headers = {}
  config.headers['content-type'] = 'application/json'
  try {
    const req = await fetch(url, config)
    const res = await req.json()
    if (!req.ok) throw res.error
    return res
  } catch (err) {
    console.error(err)
    throw err
  }
}
