import server from './server.ts'

import dotenv from 'dotenv'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  const envConfig = dotenv.config()
  if (envConfig.error) throw envConfig.error
}

const port = process.env.PORT || 3000

server.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})
