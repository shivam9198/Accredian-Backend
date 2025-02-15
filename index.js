const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const nodemailer = require("nodemailer");
const referralRouter = require ('./routes/referralRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors( {  
  origin : "http://localhost:5173", // Allows all origins (for testing)
    credentials : true ,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use('/', referralRouter);

// Test Route
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

