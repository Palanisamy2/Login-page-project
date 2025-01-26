const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/auth');

const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// mongoose.connect('mongodb://localhost:27017/companyApp', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error(err));

app.use('/api', userRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
