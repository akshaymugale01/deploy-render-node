const express = require('express')

const app = express();

const config = require('dotenv').config();
const port = process.env.PORT || 5056 ;
const jsonData = require('./jsonData');

const Product = require('./models/productModels');
const mongoose = require('mongoose');
const mongo_uri= process.env.MONGO_URL;
const cors = require('cors')

app.use(middleWare)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

function middleWare(req, res, next){
    console.log('Middleware Running..')
    next()
}

app.get('/', (req, res)=>{
    res.send("welcome to my Node Server...")
})

app.get('/home', (req ,res)=>{
    res.send("<h1>Welcome to Home Page<h1>")
})

app.get('/api/data', (req ,res)=>{
    res.json(jsonData);
})

const connectToMongo = async() =>{
    try {
        await mongoose.connect(mongo_uri).then(()=>{
            console.log("DB Connected Sucessfuly")
            app.listen(port, ()=>{
                console.log(`Server Listening To Port: ${port}`);
            });
        });
    } catch (error) {
        console.log("Error connecting to server")
    }
}

connectToMongo();

// app.listen(port, (error)=>{
//     if (error) {
//         console.log("error occured....")
//     } else {
//         console.log(`Server started listenig to port: ${port}`)
//     }
// })


//Create A Product route
app.post("/products", async(req, res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) { 
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
});

app.get('/products', async(req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        console.log("Error Accesing Products")
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return status(404).json({message: `Cant Find product with id: ${id}`})
        }else{
            res.status(200).json(product)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.delete('/products', async(req, res)=>{
    try {
          await Product.deleteMany({});
          res.status(200).json({message: "All products deletted sucessfully"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});