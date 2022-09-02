const express = require('express')
const productRouter = require('./productRouter');
const accountRouter = require('./accountRouter');
const apiRoute = express();

apiRoute.use('/product',productRouter);
apiRoute.use('/account',accountRouter);

module.exports = apiRoute;