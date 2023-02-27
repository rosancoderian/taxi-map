import { promises as fs } from 'fs'

/**
 * @param {string} date
 */
export async function readCache(date) {
  try {
    return JSON.parse(await fs.readFile(`./src/lib/server/cache/${date}.json`, 'utf8'))
  } catch (err) {
    console.error(err)
    return null
  }
}

/**
 * @param {any} data
 * @param {string} date
 */
export async function writeCache(data, date) {
  try {
    await fs.writeFile(`./src/lib/server/cache/${date}.json`, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}
