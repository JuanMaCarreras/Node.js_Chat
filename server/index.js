import express from 'express'
import logger from 'morgan'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()

const server = createServer(app)
const io = new Server(server)
app.use(logger('dev'))

io.on('connection', socket => {
    console.log('Front Connected')

    socket.on('chat message', body => {
        console.log(body)
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(5),
        })
    })
})

server.listen(3000, () => {
    console.log('Server running on port', 3000)
})
