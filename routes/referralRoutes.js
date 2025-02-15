const express = require("express");
const referralRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require("nodemailer");
require("dotenv").config(); 

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your email from .env
    pass: process.env.EMAIL_PASSWORD, // App password from .env
  },
});


// Route to handle referrals

referralRouter.post("/referrals", async (req, res) => {
    try {
      const { referrerName, referrerEmail, refereeName, refereeEmail, course } = req.body;
  
  
  if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !course) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  // Save to database using Prisma
  const referral = await prisma.Referral.create({
    data: {
      referrerName,
      referrerEmail,
      refereeName,
      refereeEmail,
      course,
    },
  });
    // Send referral email
    const mailOptions = {
      from: process.env.EMAIL,
      to: refereeEmail,
      subject: "You've been referred!",
      text: `Hi ${refereeName},\n\n${referrerName} has referred you for the ${course} course.\n\nBest Regards,\nTeam`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.send("Email error:", error.message);
      } else {
        res.send("Email sent:", info.response);
      }
    });
  
      res.status(201).json({ message: "Referral submitted successfully", referral });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });


module.exports =  referralRouter;
