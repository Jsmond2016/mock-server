
// In nodejs, how do I check if a port is listening or in use
// https://stackoverflow.com/questions/29860354/in-nodejs-how-do-i-check-if-a-port-is-listening-or-in-use
const isPortFree = port =>
  new Promise(resolve => {
    const server = require('http')
      .createServer()
      .listen(port, () => {
        server.close()
        resolve(true)
      })
      .on('error', () => {
        resolve(false)
      })
  })

  module.exports = isPortFree