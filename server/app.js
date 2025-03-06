const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const upload = multer({
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// Email transport configuration
const transporter = nodemailer.createTransport({
    service: 'your-email-service', // e.g., 'Gmail'
    auth: {
        user: 'careers@areanddee.com',
        pass: process.env.EMAIL_PASSWORD // Use environment variable for security
    }
});

// Route positions to specific team members
const positionRouting = {
    'vp-admin': 'admin-hiring@areanddee.com',
    'chief-esai': 'science-hiring@areanddee.com',
    'esai-scientist': 'science-hiring@areanddee.com',
    'data-engineer': 'engineering-hiring@areanddee.com',
    'hpc-engineer': 'engineering-hiring@areanddee.com'
};

app.post('/api/submit-application', upload.single('resume'), async (req, res) => {
    try {
        const { name, email, position, message } = req.body;
        const resumePath = req.file.path;

        // Basic validation
        if (!name || !email || !position || !req.file) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Send email to appropriate team member
        const mailOptions = {
            from: 'careers@areanddee.com',
            to: positionRouting[position],
            subject: `New Application: ${position} from ${name}`,
            text: `
                New application received:
                
                Name: ${name}
                Email: ${email}
                Position: ${position}
                Cover Letter: ${message || 'No cover letter provided'}
                
                Resume attached.
            `,
            attachments: [{
                filename: req.file.originalname,
                path: resumePath
            }]
        };

        await transporter.sendMail(mailOptions);

        // Send confirmation email to applicant
        const confirmationEmail = {
            from: 'careers@areanddee.com',
            to: email,
            subject: 'Application Received - AreandDee LLC',
            text: `
                Dear ${name},

                Thank you for your interest in joining AreandDee LLC. We have received your application for the ${position} position.

                Our team will review your application and contact you if we feel there is a good match.

                Best regards,
                AreandDee LLC Hiring Team
            `
        };

        await transporter.sendMail(confirmationEmail);

        res.json({ success: true, message: 'Application submitted successfully' });

    } catch (error) {
        console.error('Application submission error:', error);
        res.status(500).json({ error: 'Error submitting application' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 