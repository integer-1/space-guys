import request from 'superagent'
import { Apod } from '../models/welcome.ts'

const serverURL = '/api/v1'

export default async function getData(): Promise<Apod[]> {
  const response = await request.get(`${serverURL}/space`)
  return response.body
}