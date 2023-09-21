import { join } from 'node:path'
import express from 'express'
import request from 'superagent'
import * as Path from 'node:path'
import * as URL from 'node:url'
import * as dotenv from 'dotenv'

dotenv.config()
const apiKey = process.env.SPACE_KEY

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.get('/api/v1/space', async (req, res) => {
  const response = await request.get(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=2023-08-20&end_date=2023-09-20`
  )
  res.json(response.body)
})

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
