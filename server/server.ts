import { join } from 'node:path'
import express from 'express'
import request from 'superagent'
import * as Path from 'node:path'
import * as URL from 'node:url'
import * as dotenv from 'dotenv'
dotenv.config()
const apiKey = process.env.SPACE_KEY 
console.log(apiKey)

import welcome from './routes/welcome.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, './public')))

server.use('/api/v1/welcome', welcome)

server.get('/api/v1/welcome', async(req, res) => {
  const response = await request
  .get(`https://api.nasa.gov/planetary/apod`)
  .set(`Authorization`, `Bearer ${apiKey}`)

  res.json(response.body.result)  
})

export default server
