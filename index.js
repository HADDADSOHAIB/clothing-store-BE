const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./models/index');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());


const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const reviewRouter = require('./routes/reviewRouter');
const cartRouter = require('./routes/cartRouter');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/carts', cartRouter);

const port = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening at port: ${port}`));
