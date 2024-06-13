const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

app.use(express.json);

//routes
app.get('/', (req, res) =>
{
    res.send('Hello')
})

app.get('/blog', (req, res) =>
{
    res.send('Hi everyone my name is Sarthak')
})

app.post('/product', async(req, res) =>
{
    try
    {
        const product = await Product.create(req.body);
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.listen(3001, () =>
{
    console.log("Node API app is running on port 3001")
});

mongoose.connect('mongodb+srv://sarthaksachdevme21b1611:040304@samplecluster.gcjkyc5.mongodb.net/')

    .then(() =>
    {
        console.log('Connected to MongoDB')
    }).catch((error) =>
    {
        alert('Error encountered');
    })