const express = require('express');
const cors = require('cors');
const path = require('path');
const router = express.Router();

const isPortFree = require('../utils/index')
const glob = require('glob')

// https://segmentfault.com/a/1190000015185715
// https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder

const app = express();
// https://github.com/expressjs/cors
app.use(cors());

// port
let NODE_PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, './')));


const whiteList = ['index.js']

const mocks = glob.sync(`${__dirname}/../mock/*.js`, { cwd: process.cwd() })
  .filter(file => !whiteList.includes(file.slice(2)))
  .map((file) => ({ ...require(path.resolve(file)), __route: path.basename(file, '.js') }));

const logRouteMap = []
mocks.forEach(r => {
  const { __route, ...rest } = r;
  for (let key in rest) {
    const [method, pathname] = key.split(' ')
    const cb = r[key]
    router[method.toLowerCase()](pathname, cb)
    app.use(`/${__route}`, router)
    logRouteMap.push({ method, module: __route, pathname: `/${__route}${pathname}` })
  }
})

// log
console.table(logRouteMap);

~async function checkPortAndStart() {
  const isOk = await isPortFree(NODE_PORT)
  if (!isOk) {
    NODE_PORT +=1
    await checkPortAndStart()
  } else {
    app.listen(NODE_PORT, function () {
      console.log('mock服务在' + NODE_PORT + '端口上已启用！');
    });
  }
}()

