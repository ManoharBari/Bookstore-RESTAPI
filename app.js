const express = require('express');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/api', authRoutes);
app.use('/api/books', bookRoutes);

app.use(errorHandler);

module.exports = app;
