const express = require('express');
const dbConnect = require('./database/index.js');
require('dotenv').config(); // Load env variables
const config = require('./config/index.js'); // Properly import config
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const exchangeRoutes = require('./routes/exchange.js');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

// Database connection
dbConnect();

// Routes
app.use('/api', router); // General router (if defined)
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/exchanges', exchangeRoutes);

// Error handler
app.use(errorHandler);

// Start server
const port = config.port || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
