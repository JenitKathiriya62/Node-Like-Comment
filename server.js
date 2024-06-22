require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const PORT = process.env.PORT | 3000;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/restful-auth-apis')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const userRouter = require("./routes/userRoute")
app.use("/api",userRouter);


const postRouter = require("./routes/posts")
app.use("/api",postRouter);


app.listen(PORT, () => {
  console.log("Server Started");
});
