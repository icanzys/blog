const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./router.js')
const session = require('express-session')

const app = express()

// 配置express-art-template
app.engine('html', require('express-art-template'))
// 配置views的路径
app.set('views', path.join(__dirname, '/views'))

// 配置body-parser
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

// 开放静态资源
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')))

// 配置express-session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// 把路由挂载到app中
app.use(router)

app.listen(3000, function () {
  console.log('running...')
})