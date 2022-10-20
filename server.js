const express = require("express")
const app = express()
var cors = require('cors')
app.use(cors())

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

const { Client } = require("pg")
const dotenv = require("dotenv");
const { addListener } = require("nodemon");
dotenv.config()

const client = new Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.login,
    password: process.env.password,
    port: process.env.port
})

client.connect().then(() => {
    app.get('/getData', async function (req, res, next) {
        const data = await client.query('SELECT cdate,ctime,status,srcnum,dstnum,city,operator,cduration,qwaiting,messageid,recordingfile  FROM cdr fetch first 10 rows only')
        res.json(data)

    })
})