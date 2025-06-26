import React, { useState } from 'react'
import { toast } from 'react-toastify';

export const BulkEmail = () => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSendEmails = async () => {
        if (!subject || !message) {
            toast.error("Subject and message are required!");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscribe/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subject, message }),
            });

            const data = await response.json();
            if (data.message === "Emails sent successfully!") {
                setSubject('');
                setMessage("");
                toast.success("Emails sent successfully!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Failed to send emails!");
        }
    };
    return (
        <div className="mb-4 px-3 py-3">
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
                className="form-control mb-2"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
            />
            <button className="btn btn-primary" onClick={handleSendEmails}>
                Send Bulk Emails
            </button>
        </div>)
}
