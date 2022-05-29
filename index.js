require('dotenv').config({path: __dirname + '/.env'})
let express = require('express')
let expressSession = require('express-session')
// let fileupload = require('express-fileupload')
let connectFlash = require('connect-flash')
let mongoose = require('mongoose')

let { APPNAME, PORT, dbhost, dbport, dbname, sessionsecret, domain, owner_mat_no, owner_name} = require('./config') 

// routes
const { LoginRouter, UserRouter, DepartmentRouter, FacultyRouter, StudentRouter, StudentClientRouter, ClearanceRouter } = require('./routes')

// models
const DepartmentModel = require('./models/department')
const FacultyModel = require('./models/faculty')
const StudentModel = require('./models/student')
const UserModel = require('./models/user')

// connect to mongodb database
// mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`)

//bring in mongo uri from mlab
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qmunc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
//monnect mongodb
mongoose.connect(mongoURI);

// init express App
let app = express()

// view engine 
app.set('view engine', 'ejs')
app.set('views', './views')

// expressStatic
app.use(express.static(__dirname + '/'))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

// bodyparser middlewares
app.use(express.json())
app.use(express.urlencoded())

// app.use(fileupload())

// express-session middleware
app.use(expressSession({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: true,
}))
app.use(connectFlash())

app.use((req, res, next) => {
  res.locals.errors = req.flash('errors')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.success_msg = req.flash('success_msg')
  res.locals.user = req.session.user || { username: 'test' }
  app.locals.owner_name = owner_name
  app.locals.owner_mat_no = owner_mat_no
  app.locals.appname = APPNAME
  app.locals.port = PORT
  app.locals.domain = domain + ':' + process.env.PORT
  next()
})

// routes

// student client router
app.use('/student', StudentClientRouter)

app.use('/login', LoginRouter)

app.use('/', (req, res, next) => {
  // for authenticating login
  if (req.session.user) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  res.redirect('/login')
})

let getDashboard = async (req, res) => {
  try {
    let departments_count = await DepartmentModel.count()
    let students_count = await StudentModel.count()
    let faculties_count = await FacultyModel.count()
    let users_count = await UserModel.count()
    res.render('dashboard', {departments_count, students_count, faculties_count, users_count})
  } catch (err) {
    console.log(err)
    res.render('dashboard', {
      students_count: 0, departments_count: 0, faculties_count: 0, users_count: 0,
    })
  }
}

app.get('/', getDashboard)

app.get('/dashboard', getDashboard)

app.use('/clearances', ClearanceRouter)

app.use('/departments', DepartmentRouter)

app.use('/faculties', FacultyRouter)

app.use('/students', StudentRouter)

app.use('/users', UserRouter)


app.listen(process.env.PORT, () => { console.log(`${APPNAME} running on port ${process.env.PORT}`) })