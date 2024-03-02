import { web } from './application/web'

const port = process.env.PORT ?? 8000

web.listen(port, () => {
  console.log(`\nApp Running on http://localhost:${port}/api`)
  console.log('Press Ctrl-C to terminate\n')
})
