require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 9000;
const url = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
});

// Define routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});