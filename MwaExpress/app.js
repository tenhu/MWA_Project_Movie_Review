const express = require('express');

const movieRouter = require('./router/movie');
const reviewRouter = require('./router/review');
const userRouter = require('./router/user');

const app = express();


app.use('/movie', movieRouter);
app.use('/review', reviewRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
     res.status(200).send('Hello this our Movie project back end');
});

app.listen(3000, () => {
     console.log('Good Luck');
});
