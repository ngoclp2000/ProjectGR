const express = require('express')
const productRouter = require('./productRouter');
const accountRouter = require('./accountRouter');
const orderRouter = require('./orderRouter');
const authRouter = require('./authRouter');
const apiRoute = express();

apiRoute.use('/product',productRouter);
apiRoute.use('/account',accountRouter);
apiRoute.use('/order',orderRouter);
apiRoute.use('/auth',authRouter);

module.exports = apiRoute;