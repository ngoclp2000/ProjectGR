require('dotenv').config();
const cookieParser = require("cookie-parser");
const express = require('express')
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const apiRoute = require('./src/routes/router');
const prototype = require('./src/helpers/prototype');

const accessLogStream = fs.readFileSync("./logs/access.log",{
    interval: "id",
    path: path.join(__dirname, 'log')
});
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.LISTENING_PORT || 8888;
const app = express();
app.use(cookieParser());
// app.use(morgan(isProduction ? morgan("combined", {stream : accessLogStream}): morgan("dev") ) );
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((error, req, res, next) => {
    res.status(error.errorCode);
    res.json({ message: error.message });
});
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(apiRoute);

const server = app.listen(port);