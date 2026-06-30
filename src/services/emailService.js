/**
 * Service to handle sending emails.
 * Sends the contact form submission directly to the Express API server endpoint.
 */

export const sendEmail = async ({ name, email, message }) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, message: data.message || "Message sent successfully!" };
    }
    throw new Error(data.message || "Failed to send message via SMTP server.");
  } catch (error) {
    console.error("Email service error:", error);
    return { success: false, message: error.message };
  }
};
