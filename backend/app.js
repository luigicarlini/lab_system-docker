// Import required modules and dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

// hypothetical file for JWT strategy
const passport = require('passport');
const passportJWT = require(path.join(__dirname, 'config', 'passport'));


// Initialize the Express app
const app = express();



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Middleware for CORS, JSON parsing
const corsOptions = {
  //origin: 'http://localhost:3000',  // replace with your frontend server address
  origin: '*',  // Allows requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  //optionsSuccessStatus: 204,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());

// Express Session Middleware
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));


app.use(passport.initialize());
// to setup JWT strategy
passportJWT(passport); 

// Initialize Passport Middleware
//app.use(passport.initialize());
//app.use(passport.session());

// Import and use routes
const instrumentRoutes = require(path.join(__dirname, 'routes', 'instruments'));
const userRoutes = require(path.join(__dirname, 'routes', 'users'));
//const bookingRoutes = require(path.join(__dirname, 'routes', 'bookings'));
//const instrumentRoutes = require('./routes/instruments');
//const userRoutes = require('./routes/users');
//const bookingRoutes = require('./routes/bookings');

//app.use('/api/instruments', instrumentRoutes);  // ? ==> change to app.use('/api/instruments', instrumentRoutes);
//app.use('/api/users', userRoutes);
app.use('/instruments', instrumentRoutes);  // ? ==> change to app.use('/api/instruments', instrumentRoutes);
app.use('/users', userRoutes);
//app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

// Existing Code: Server Listen
// Explicitly specify the host as '0.0.0.0'
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB connected at ${process.env.MONGODB_URI}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
