const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const movieRouter = require('./router/movie');
const reviewRouter = require('./router/review');
const userRouter = require('./router/user');
const loginRouter = require('./router/login');
const jwt = require('./commons/jwt');
const settings = require('./hidden');

const app = express();
mongoose.connect(settings.mongodb.connectionstring).then(result => {
     console.log("ok");
   }).catch(err => {
     console.log(err);
   });

app.use(cors());
app.use(bodyParser.json()); 

app.use('/movie', movieRouter);
app.use('/review', reviewRouter);
app.use('/user', jwt(['admin']), userRouter);
app.use('/login', loginRouter);

app.get('/', (req, res) => {
     res.status(200).send('Hello this our Movie project back end');
});

app.listen(3000, () => {
     console.log('Good Luck');
});
