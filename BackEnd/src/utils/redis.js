const redis = require('redis');
require("dotenv").config();


const client = redis.createClient({
    port: process.env.REDIS_PORT,
    host : process.env.REDIS_HOST
})

client.connect();

client.ping((err,pong) =>{
    console.log(pong);
});



module.exports = client;