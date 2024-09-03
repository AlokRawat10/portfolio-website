const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from Portfolio/public
app.use(express.static(path.join(__dirname, 'public')));

// Handle the root route to serve the main.html file
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'main.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status).end();
        }
    });
});

// Email configuration using your Gmail account
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alokrawat290417@gmail.com', // Your Gmail address
        pass: 'mnfw yyou kskf kxzy',  // Replace with your Gmail password or App Password
    },
});

app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email, // Email address of the visitor
        to: 'alokrawat290417@gmail.com', // Your Gmail address
        subject: `Contact Form Submission from ${name}`,
        text: `You have received a new message from your website's contact form.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ status: 'fail', error: error.message });
        } else {
            return res.status(200).json({ status: 'success', info });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
