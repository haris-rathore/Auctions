import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import mongoose from "mongoose";
import { config } from "dotenv";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
  },
});

config({
  path: "./config.env",
});

io.on("connection", (socket) => {
  socket.on('joinRoom', (room)=>{
    socket.join(room);
  })
  socket.on('leaveRoom', (id)=>{
    socket.leave(id);
  })
  socket.on('getAuctions', async ()=>{
    try{
      const response = await fetch("http://localhost:8000/auctions", {
            method: "GET",
            // body: JSON.stringify(auction),
            // headers:{
            //     "Content-Type": "application/json" 
            // }
        })
        const responseJSON = await response.json();
        io.emit('getAuctions', responseJSON);
    }catch(error){
      console.log("server error", error);
    }
  })

  socket.on('search', async (search)=>{
    const query = search.search;
    try{
      const response = await fetch("http://localhost:8000/auctions", {
            method: "GET",
            // body: JSON.stringify(auction),
            // headers:{
            //     "Content-Type": "application/json" 
            // }
        })
        const responseJSON = await response.json();
        const resp = await JSON.parse(JSON.stringify(responseJSON))
        let matched = [];
        for(let i = 0; i < resp.length; i++){
          if(resp[i].title.includes(query)){
            matched.push(resp[i]);
          }
        }
        const matchedJSON = JSON.parse(JSON.stringify(matched));
        io.emit('search', matchedJSON);
    }catch(error){
      console.log("server error", error);
    }
  })

  socket.on('createAuction', async (auction)=>{
    try{
      const response = await fetch("http://localhost:8000/auctions", {
            method: "POST",
            body: JSON.stringify(auction),
            headers:{
                "Content-Type": "application/json" 
            }
        })
        const responseJSON = await response.json();
        io.emit('createAuction', responseJSON);
    }catch(error){
      console.log("server error", error);
    }
  })

  socket.on('bid', async (bidData) =>{
    try{
      const response = await fetch("http://localhost:8000/auctions", {
            method: "PATCH",
            body: JSON.stringify(bidData),
            headers:{
                "Content-Type": "application/json" 
            }
        })
        const bid = await response.json();
        io.to(bidData.id).emit('setPrice', bid);
    }catch(error){
      console.log("server error", error);
    }
  })

  socket.on('signUp', async (profile) =>{
    try{
      const response = await fetch("http://localhost:8000/profiles", {
            method: "POST",
            body: JSON.stringify(profile),
            headers:{
                "Content-Type": "application/json" 
            }
        })
        const responseJSON = await response.json();
        io.emit('signUp', responseJSON);
    }catch(error){
      console.log("server error", error);
    }
  })

  socket.on("login", async (profile)=>{
    try{
    const response = await fetch("http://localhost:8000/profiles", {
      method: "POST",
            body: JSON.stringify(profile),
            headers:{
                "Content-Type": "application/json" 
            }
    })
    const responseJSON = await response.json();
        io.emit('login', responseJSON);
    }catch(error){
      console.log("server error", error);
    }
  })

  socket.on("getProfile", async (username)=>{
    try{
    const response = await fetch("http://localhost:8000/profiles/" + username, {
      method: "GET",
            // body: JSON.stringify(profile),
            // headers:{
            //     "Content-Type": "application/json" 
            // }
    })
    const responseJSON = await response.json();
        io.emit('getProfile', responseJSON);
    }catch(error){
      console.log("server error", error);
    }
  })

  socket.on('ChangePassword', async (profile) =>{
    try{
      const response = await fetch("http://localhost:8000/profiles", {
            method: "PATCH",
            body: JSON.stringify(profile),
            headers:{
                "Content-Type": "application/json" 
            }
        })
        const responseJSON = await response.json();
        io.emit('ChangePassword', responseJSON);
    }catch(error){
      console.log("server error", error);
    }
  })
  
  console.log("USER CONNECTED:", socket.id);
});





// Database connect

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
      server.listen(8000, () => {
        console.log("Server is running on port", process.env.PORT);
      })
    })
    .catch((err)=>{
      console.log(err)
    });