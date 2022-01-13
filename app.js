//environment var and async wrapper
require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

//db
const ConnectDB = require('./db/ConnectDB')

//authorization
const auth = require('./middleware/Authorization')

//routes
const authRouter = require('./routes/auth')
const albumRouter = require('./routes/album')

//error handler middleware
const ErrorHandlerMiddleware = require('./middleware/ErrorHandler')

//static files dependencies
app.use(express.json())

//user routes
app.use('/api', authRouter)
app.use('/api', auth, albumRouter)

//dummy route
app.get('/', (req, res) => {
    res.send('welcome user!')
})

//error handler middleware
app.use(ErrorHandlerMiddleware)



const port = process.env.PORT || 4005

const start = async () => {
    try {
        await ConnectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`El server esta escuchando en el puerto ${port}`)
        })
    } catch (error) {
        
    }
}

start()