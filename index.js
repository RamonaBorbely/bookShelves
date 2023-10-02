require('dotenv').config()
const express = require('express')
// const flash = require('connect-flash');

const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('./config/passportConfig')


const connectDB = require('./models/db')

const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 8000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(methodOverride('_method'))

// leave this above db connection
app.use(session({
    secret: "A long string",
    resave: false,
    saveUninitialized: false,
    cookie: { secure:false } // this is false for moment
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});


app.use(express.urlencoded({extended: true}))
app.use(express.json())

connectDB()
// app.use(flash()) // not in use, need to remove the use in some file

app.use('/',routes)


app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})