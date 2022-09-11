const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const methodOverride = require("method-override");
const createPath = require("./helpers/create-path");
const cors = require("cors");
var fileUpload = require("express-fileupload");
const testApiRoutes = require("./routes/api-tests-routes");
const userApiRoutes = require("./routes/api-user-routes");
const videoApiRoutes = require("./routes/api-video-routes");
const errorMiddleware = require("./middlewares/error-middleware");
const cookieParser = require("cookie-parser");
const chatService = require("./service/chat-servise");
const ChatMessageDto = require("./dtos/chat-message-dto");
const User = require("./models/user");

const errorMsg = chalk.bgKeyword("white").redBright;
const successMsg = chalk.bgKeyword("green").white;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

const WSserver = require("express-ws")(app);
const aWss = WSserver.getWss();
app.ws("/", (ws, req) => {
  console.log("Подключение установлено");
  ws.send("Ты успешно подключился");
  ws.on("message", async (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "message":
        if (msg.message) {
          const message = await chatService.sendMessage(msg.message, msg.id);
        }
        const messages = await chatService.getMessages();
        aWss.clients.forEach((client) => {
          let newArray = messages.slice();
          newArray.forEach(async (message, index) => {
            const user = await User.findById(message.userId);
            const messageDto = new ChatMessageDto(message);
            messageDto.user = { img: user.img };
            newArray[index] = messageDto;
          });
          client.send(
            JSON.stringify({
              method: "message",
              messages: newArray,
            })
          );
          console.log("send success");
        });
        break;
    }
  });
});

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};
const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      setTimeout(() => {
        client.send(`Пользователь ${msg.username} подключился`);
      }, 5000);
    }
  });
};

app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(successMsg("Connected to DB")))
  .catch((error) => console.log(errorMsg(error)));
//

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(errorMsg(error))
    : console.log(successMsg(`listening port ${process.env.PORT}`));
});

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(fileUpload({}));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.urlencoded({ extended: false }));

app.use(express.static("styles"));

app.use(methodOverride("_method"));
app.use(testApiRoutes);
app.use(userApiRoutes);
app.use(videoApiRoutes);
app.use(errorMiddleware);

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});
