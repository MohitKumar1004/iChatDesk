require('dotenv').config()
// Node Server which will handle socket io connection
const io=require('socket.io')(8000,{cors: {origin:"*"}});
// const io=require('socket.io')(process.env.SERVER_PORT,{cors: {origin:"*"}});
// Storage of User Ids
const users={}
// We are creating a connection
// io.on will listen all connection
console.log("Connection Opened")
io.on('connection',socket=>{
    console.log("New User joined")
    // socket.on will listen particular connection
    socket.on('new-user-joined',username=>{
        // If user joined event is found, socket.id is key and name
        console.log("New User",username)
        users[socket.id]=username
        // If a user joined say 6th, all other users except 6th will be braodcasted the message as a new user has joined
        socket.broadcast.emit('user-joined',username)
    });
    // send ,receive, new-user-joined ,etc are event type variable names
    // If send is clicked ,other user will receive the message
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
    // user disconnected/left the chat
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete socket.id;
    });
})

// Express helps to create a server
const express = require('express')

// path module helps to get files of the files in server
const path = require('path')

const app = express()
const port = 3001
// const port = process.env.CLIENT_PORT

// folder path is given
app.use(express.static('./'))

// frontend is deployed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'))
    res.sendFile
})

// frontend is listened at a different port
app.listen(port,() => {
    console.log(`listening on port ${port}`)
})