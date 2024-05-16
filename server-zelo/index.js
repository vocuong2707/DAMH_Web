const express = require("express");
const cors = require("cors");
const connectDB = require("./src/configs/connectDB");

const authRouter = require("./src/routers/authRouter");
const userRoute = require("./src/routers/userRoute");
const messageRouter = require("./src/routers/messageRouter");
const groupRouter = require("./src/routers/groupRouter");

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRoute);
app.use("/messages", messageRouter);
app.use("/groups", groupRouter);

// Connect to MongoDB
connectDB();
// create a http.Server instance

const server = app.listen(PORT, () => { // Khởi tạo server và lắng nghe trên PORT được xác định
  console.log("Server Started in", PORT);
});

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  }
});


socketIo.on("connection", (socket) => {
  socket.on("createRoom", (data) => {
    const roomId = [data.userId, data.friendId].sort().join('-');
    socket.join(roomId);
  });

  socket.on("sendMessage", (message) => {

    socket.to(message.roomId).emit("receiveMessage", message);
    console.log("sendMessage: " + message.text);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on('messageDeleted', (deletedMessageId) => {
    console.log(`Message with ID ${deletedMessageId} is deleted`);
    socket.emit('messageDeleted', deletedMessageId);
  });

  socket.on('joinGroup', ({ userId, groupId }) => {
    socket.join(groupId);
    console.log(`User ${userId} joined group ${groupId}`);
  });

  socket.on('leaveGroup', ({ userId, groupId }) => {
    socket.leave(groupId);
    console.log(`User ${userId} left group ${groupId}`);
  });



  socket.on('createGroup', ({ userId, groupId }) => {
    socket.join(groupId);
    console.log(`User ${userId} created group ${groupId}`);

  });
});