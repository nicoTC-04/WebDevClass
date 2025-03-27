// File: user.js
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'SabritonesCNG@gmail.com',
        pass: process.env.EMAIL_PASS
    }
});




function generateRandomPassword(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}


// Get all users
router.get("/", async (req, res) => {
    const users = await prisma.users.findMany(); // Use `user` instead of `users`
    res.json(users);
});

// Validate user login and returns userID
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
        where: { email },
    });
    if (user && user.password === password) {
        user.id = user.id.toString();
        res.json({ success: true, id: user.id });
    } else {
        res.json({ success: false });
    }
});

// Add a new user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, birthday } = req.body;

        // Convert birthday string to a Date object
        const formattedBirthday = new Date(birthday);

        if (isNaN(formattedBirthday.getTime())) {
            return res.status(400).json({ success: false, message: "Invalid date format" });
        }

        const user = await prisma.users.create({
            data: { name, email, password, birthday: formattedBirthday },
        });

        res.json({ success: true, id: user.id.toString() });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Send forget password email to user
router.post("/forget-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Generar nueva contraseña
        const newPassword = generateRandomPassword();

        // Actualizar la contraseña en la base de datos
        await prisma.users.update({
            where: { email },
            data: { password: newPassword },
        });

        const mailOptions = {
            from: 'SabritonesCNG@gmail.com',
            to: email,
            subject: 'Recuperación de contraseña',
            text: `Hola, \n\nTu nueva contraseña es: ${newPassword}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
                return res.status(500).json({ success: false, message: "Failed to send email" });
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).json({ success: true, message: "Email sent successfully" });
            }
        });

    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
