require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
// include routes here

app.listen(3000, () => console.log("Server running on port 3000"));
