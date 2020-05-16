const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./models/index');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());


const userRouter = require('./routes/userRouter');

app.use('/api/v1/users', userRouter);


const port = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => console.log(`App listening at port: ${port}`));