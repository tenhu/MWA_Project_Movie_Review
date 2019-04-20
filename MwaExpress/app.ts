import bodyParser = require("body-parser");
import express = require("express");
import mongoose = require("mongoose");

// const movieRouter = require('./router/movie');
// const reviewRouter = require('./router/review');
// const userRouter = require('./router/user');

const userName = ""; // require('./hidden').getUserName();
const passWord = ""; // require('./hidden').getPassword();

const app = express();
mongoose.connect(
     "mongodb+srv://" + userName + ":" + passWord + "@mycluster-4moia.mongodb.net/mwa_project?retryWrites=true"
   ).then((result) => {
    console.log("ok");
   }).catch((err) => {
     console.log(err);
   });

app.use(bodyParser.json());

// app.use('/movie', movieRouter);
// app.use('/review', reviewRouter);
// app.use('/user', userRouter);

app.get("/", (req, res) => {
     res.status(200).send("Hello this our Movie project back end");
});

app.listen(3000, () => {
     console.log("Good Luck");
});
