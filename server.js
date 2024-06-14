const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//routes
app.get('/', (req, res) =>
{
    res.send('Hello')
})

app.get('/blog', (req, res) =>
{
    res.send('Hi everyone my name is Sarthak')
})

app.post('/product', async (req, res) =>
{
    try
    {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error)
    {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.get('/product', async (req, res) =>
{
    try
    {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error)
    {
        res.status(500).json({ message: error.message });
    }
})

app.get('/product/:id', async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error)
    {
        res.status(500).json({ message: error.message });
    }
})

app.put('/product/:id', async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const products = await Product.findByIdAndUpdate(id, req.body);
        if (!products)
        {
            return res.status(404).json({ message: `cannot find any product with ID: ${id}` })
        }
        const UpdatedProduct = await Product.findById(id);
        res.status(200).json(UpdatedProduct);

    } catch (error)
    {
        res.status(500).json({ message: error.message });
    }
})

app.delete('/product/:id', async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const products = await Product.findByIdAndDelete(id, req.body);
        if (!products)
        {
            return res.status(404).json({ message: `cannot find any product with ID: ${id}` })
        }
        res.status(200).json(products);

    } catch (error)
    {
        res.status(500).json({ message: error.message });
    }
})

mongoose.connect('mongodb+srv://sarthaksachdevme21b1611:040304@samplecluster.gcjkyc5.mongodb.net/')

    .then(() =>
    {
        console.log('Connected to MongoDB')
        app.listen(3001, () =>
        {
            console.log("Node API app is running on port 3001")
        });
    }).catch((error) =>
    {
        alert('Error encountered');
    })