import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve static built files in production
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 5000;

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Set up transporter using local SMTP credentials from .env
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false, // 587 is TLS (upgrade via STARTTLS), secure should be false
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.VITE_TO_EMAIL || process.env.EMAIL_USER,
      subject: `New Message from Portfolio: ${name}`,
      text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #ff5f40; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ff5f40; margin-top: 15px;">
            <p style="margin: 0; white-space: pre-line;">${message}</p>
          </div>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

// Fallback to React app for non-API routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
