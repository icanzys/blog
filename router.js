const express = require('express')

const User = require('./models/user')

const router = express.Router()

router.get('/', function (req, res) {
  res.render('index.html')
})

router.get('/login', function (req, res) {
  res.render('login.html')
})

router.post('/login', function (req, res) {
  res.render('login.html')
})

router.get('/register', function (req, res) {
  res.render('register.html')
})

router.post('/register', function (req, res) {
  let body = req.body
  User.findOne({
    $or: [{email: body.email}, {nickname: body.nickname}]
  }, function (err, data) {
    if (err) {
      // exress中提供了一个json方法自动将对象转为字符串发送给客户端
      return res.status(500).json({
        success: false,
        message: '服务端错误'
      })
    }
    if (data) {
      // 邮箱或者昵称已存在
      return res.status(200).json({
        err_code: 1,
        success: true,
        message: '邮箱或者昵称已存在'
      })
    } else {
      new User(body).save(function (err, user) {
        if (err) {
          return res.status(500).json({
            err_code: 500,
            success: false,
            message: '服务端错误'
          })
        }
      })
      // 注册成功,使用session记录用户登陆状态
      req.session.isLogin = true
      res.status(200).json({
        err_code: 0,
        success: true,
        message: 'ok'
      })
    }
  })
})



module.exports = router