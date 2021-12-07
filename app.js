// var express = require('express')
// var parseurl = require('parseurl')
// var session = require('express-session')
// const cors = require('cors')

// var app = express()
// app.use(cors())
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))


// app.get('/', function (req, res, next) {
//   res.send('ahfsiai')
//   console.log(req.session)
// })
// app.get('/login', function (req, res, next) {
//   req.session.auth = true
//   res.send('sadsa')
// })
// app.get('/logout', function (req, res, next) {
//   //   app.use(session({
//   //   secret: 'keyboard cat',
//   //   resave: false,
//   //   saveUninitialized: true
//   // }))
//   req.session.auth = false
//   res.send(req.session)
// })
// app.get('/auth', function (req, res, next) {
//   if (req.session.auth) {
//     res.send('session 로그인 성공')
//   } else {
//     res.send('세션 로그인 실패')
//   }
// })
// app.listen(3001, function () {
//   console.log('3001!')
// })

var express = require('express')
var app = express()
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const cors = require('cors')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var url = require('url');
app.use(express.json())
app.use(cors(
  {
  origin:true,
  methods:['GET','POST'],
  credentials:true
}
))
// app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  key:'userId',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie:{
    expires:60*60*24
  },
  store:new FileStore()
}))

// app.use(function (req, res, next) {

//   if (req.session.num === undefined) {
//     req.session.num = 1
//   } else {
//     req.session.num = req.session.num + 1
//   }

// })

app.get('/', function (req, res, next) {
  // if (req.session.num === undefined) {
  //   req.session.num = 1
  // } else {
  //   req.session.num = req.session.num + 1
  // }
  res.send(`views:${req.session.num}wqeq`)
  console.log(req.session)
})
app.get('/foo',(req,res)=>{
  if(req.session.num===undefined){
    req.session.num=1
  }else{
    req.session.num=req.session.num+1
  }
  res.send(`views:${req.session.num}`)
  console.log(req.session)
})

app.get('/login',(req,res)=>{
  if(req.session.user){
    res.send({loggedIn:true,user:req.session.user})
  }else{
    res.send({loggedIn:false})
  }
})

app.post('/login', function (req, res, next) {  

  req.session.user = 'jack'
  res.send('jack')
console.log(req.session.user)
})
app.post('/logout', function (req, res, next) {  

  req.session.user = undefined
  res.send('loggedout')
})
app.post('/auth',(req,res)=>{
  if(req.session.user){
    res.send({loggedIn:true,user:req.session.user})
  }else{
    res.send({loggedIn:false})
  }
  console.log(req.session)
})


app.listen(3001, function () {
  console.log('3001!')
})