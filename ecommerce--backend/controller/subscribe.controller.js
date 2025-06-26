const nodemailer = require("nodemailer");
const Subscriber = require("../model/Subscriber");
// Add a new subscriber
exports.addSubscribe = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ status: 'fail', message: 'Email is required' });
    }

    try {
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.status(409).json({ status: 'fail', message: 'Email already subscribed' });
        }

        const newSubscriber = await Subscriber.create({ email });

        res.status(201).json({
            status: 'success',
            message: 'Subscribed successfully!',
            data: {
                email: newSubscriber.email,
                subscribedAt: newSubscriber.subscribedAt,
            },
        });
    } catch (err) {
        console.error('Subscription error:', err.message);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

// Get all subscribers
exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
        res.status(200).json({ status: "success", subscribers });
    } catch (err) {
        console.error("Fetch error:", err.message);
        res.status(500).json({ status: "error", message: "Could not fetch subscribers" });
    }
};

// Send emails to all subscribers
exports.sendEmails = async (req, res) => {
    try {
        const { subject, message } = req.body;

        const subscribers = await Subscriber.find();
        const emails = subscribers.map(sub => sub.email);

        if (!emails || emails.length === 0) {
            return res.status(400).json({ message: "No subscribers to send emails" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER || "silentvisagee@gmail.com",
                pass: process.env.EMAIL_PASS || "sgpv ceit nqjx cgxs",
            },
        });

        const batchSize = 50;
        for (let i = 0; i < emails.length; i += batchSize) {
            const batch = emails.slice(i, i + batchSize);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: batch.join(","),
                subject: subject || "Updates from AR Decor",
                text: message || "Hello! We have some exciting updates for you!",
            };

            await transporter.sendMail(mailOptions);
        }

        return res.status(200).json({ message: "Emails sent successfully!" });
    } catch (error) {
        console.error("Error sending emails:", error);
        return res.status(500).json({
            message: "Error sending emails",
            error: error instanceof Error ? error.message : error,
        });
    }
};


exports.deleteEmail = async (req, res) => {
    // console.log("Deleting email...");
    const { id } = req.params;
    try {
        const deletedEmail = await Subscriber.findByIdAndDelete(id);
        if (!deletedEmail) {
            return res.status(404).json({ message: "Email not found" });
        }
        res.status(200).json({ message: "Email deleted successfully", deletedEmail });
    } catch (error) {
        console.error("Error deleting email:", error);
        res.status(500).json({ message: "Error deleting email", error: error.message });
    }
}

// Export all controllers
