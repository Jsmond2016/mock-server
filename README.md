# Mock-server

一个基于 express 的简单 mock-server

## 特点

- 快速创建 mock
- 热启动



## 如何使用：

项目根目录新建 `mock` 文件夹，填写如下格式的 `mock` 文件

```js
module.exports = {
  'GET /test': (req, res, next) => {
    res.json('hello')
  },
  'POST /test3': (req, res, next) => {
    res.json('hello')
  },
}
```


**说明：** 新增的路由，会自动带上文件名作为路由前缀