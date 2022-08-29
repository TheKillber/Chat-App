const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname + "/../../build")));
app.get("/", (req, res, next) => res.sendFile(__dirname + "./index.html"));

io.on("connection", (socket) => {
   const id = socket.handshake.query.id;
   socket.join(id);

   socket.on("send-message", ({ recipients, text }) => {
      recipients.forEach((recipient) => {
         const newRecipients = recipients.filter((r) => r !== recipient);
         newRecipients.push(id);
         socket.broadcast.to(recipient).emit("receive-message", {
            recipients: newRecipients,
            sender: id,
            text,
         });
      });
   });
});
const PORT = process.env.PORT || 5000;

server.listen(PORT);
