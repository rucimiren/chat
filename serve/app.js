const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})

/* app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
}) */

server.listen(3000)

const users = []

app.use(require('express').static('public'))

app.get('/', (req, res) => {
  res.redirect('/index.html')
  // res.send('<h1>Hello world</h1>')
})

io.on('connection', socket => {
  // console.log(socket)
  // 注册登录事件
  socket.on('login', data => {
    // 判断该用户是否已经存在了
    const user = users.find(item => item.username === data.username)
    if (user) {
      // 如果user存在
      // 提示浏览器登录失败
      socket.emit('loginError')
    } else {
      // 将用户给保存起来
      users.push(data)
      socket.username = data.username
      socket.avatar = data.avatar

      // 提示浏览器登录成功了
      socket.emit('loginSuccess', data)

      // 广播给所有的用户，有人加入了聊天室
      io.emit('addUser', data)

      // 广播给所有用户，用户数据发生改变
      io.emit('userList', users)
    }
  })

  // 处理聊天请求
  socket.on('chatMessage', data => {
    console.log(data, 'chatMessage')
    // 直接广播给所有人
    io.emit('receiveMessage', data)
  })

  // 离线处理
  socket.on('disconnect', () => {
    io.emit('delUser', {
      username: socket.username,
      avatar: socket.avatar,
    })
    // 如果离线了，删除对应的用户
    let idx = users.findIndex(item => item.username === socket.username)
    users.splice(idx, 1)
    io.emit('userList', users)
  })

  // 处理图片请求
  socket.on('sendImage', data => {
    // 直接广播给所有人
    io.emit('receiveImage', data)
  })
})
