import express from 'express'
import logger from 'morgan'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173/',
    },
})
app.use(logger('dev'))

io.on('connection', socket => {
    console.log('Front Connected')
})

server.listen(3000, () => {
    console.log('Server running on port', 3000)
})
