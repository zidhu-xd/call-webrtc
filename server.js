const express=require("express")
const http=require("http")
const {Server}=require("socket.io")

const app=express()
const server=http.createServer(app)
const io=new Server(server)

app.use(express.static("public"))

const rooms={}

io.on("connection",socket=>{

socket.on("join",room=>{

socket.join(room)

rooms[room]=(rooms[room]||0)+1

if(rooms[room]==2){
io.to(room).emit("ready")
}

})

socket.on("offer",data=>{
socket.to(data.room).emit("offer",data.offer)
})

socket.on("answer",data=>{
socket.to(data.room).emit("answer",data.answer)
})

socket.on("ice",data=>{
socket.to(data.room).emit("ice",data.candidate)
})

})

server.listen(process.env.PORT||3000)
