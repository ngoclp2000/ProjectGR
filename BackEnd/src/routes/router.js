const express = require('express')
const productRouter = require('./productRouter');
const accountRouter = require('./accountRouter');
const orderRouter = require('./orderRouter');
const apiRoute = express();

apiRoute.use('/product',productRouter);
apiRoute.use('/account',accountRouter);
apiRoute.use('/order',orderRouter);

module.exports = apiRoute;