require("dotenv").config();
const express = require('express');
const dbConnect = require("./database/index.js");
const config = require("./config/index.js");  // Properly import config
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler.js");
const feedbackRoutes = require("./routes/feedbackRoutes.js");
const EmployeeRoutes = require("./routes/EmployeeRoutes");
const EmployeeController = require("./controllers/EmployeeController.js");
const uploadRoutes = require("./routes/uploadRoutes");
const cors=require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const exchangeRoutes = require("./routes/exchange.js");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());


dbConnect(); 

// Set the port from config or default to 3000

app.use(express.json());

// Define Routes
app.use("/api", uploadRoutes);
app.use("/api/employee", EmployeeRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api", router);
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/exchanges", exchangeRoutes);


// // Database Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));


app.use(errorHandler);

// Start the server
const port = config.port || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));