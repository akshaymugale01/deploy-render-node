const express = require('express')
const app = express();

const config = require('dotenv').config();
const port = process.env.PORT || 5056 ;

function middleWare(req, res, next){
    console.log('Middleware Started')
    next()
}

app.get('/', (req, res)=>{
    res.send("welcome to my Node Server...")
})

app.get('/home', (req ,res)=>{
    res.send("<h1>Welcome to Home Page<h1>")
})

app.listen(port, (error)=>{
    if (error) {
        console.log("error occured....")
    } else {
        console.log(`Server started listenig to port: ${port}`)
    }
})