const express = require("express")
const http = require("http")
const {Server} = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("public"))

const rooms = {}

io.on("connection", socket=>{

socket.on("join", room=>{

socket.join(room)

if(!rooms[room]){
rooms[room]=1
}else{
rooms[room]++
}

if(rooms[room]==2){
io.to(room).emit("ready")
}

})

socket.on("offer", data=>{
socket.broadcast.emit("offer", data)
})

socket.on("answer", data=>{
socket.broadcast.emit("answer", data)
})

socket.on("ice", data=>{
socket.broadcast.emit("ice", data)
})

})

server.listen(3000, ()=>{
console.log("server running")
})
