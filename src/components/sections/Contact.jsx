import React, { useState, useCallback } from 'react';
import { sendEmail } from '../../services/emailService';

/**
 * Contact Component (Section)
 * Form for submitting inquiries.
 * Displays title and action button on the left, and input fields on the right.
 * Memoized state modifications prevent redundant layout updates on typing.
 */
const Contact = React.memo(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ submitted: false, success: false, message: '' });

  // Memoized input change handler
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user begins typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Form validator
  const validateForm = useCallback(() => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) tempErrors.message = 'Message content is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }, [formData]);

  // Memoized submit handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus({ submitted: true, success: false, message: 'Sending message...' });

    try {
      const response = await sendEmail(formData);
      if (response.success) {
        setStatus({
          submitted: true,
          success: true,
          message: 'Thank you! Your message has been sent successfully.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          submitted: true,
          success: false,
          message: `Failed to send: ${response.message}`
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        submitted: true,
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      });
    }
  }, [formData, validateForm]);

  return (
    <section id="contacts" className="contact-section">
      <div className="contact-container container">
        <form onSubmit={handleSubmit} className="contact-grid grid-2">
          
          {/* Left Column: Heading and Action Button */}
          <div className="contact-info">
            <span className="contact-badge-text">Contacts</span>
            <h2 className="contact-title">
              Have a project?<br />Let's talk!
            </h2>
          </div>
          
          {/* Right Column: Custom underline fields */}
          <div className="contact-fields">
            
            {/* Name Input */}
            <div className="input-group">
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`underline-input ${errors.name ? 'has-error' : ''}`}
                placeholder=" "
                required
              />
              <label htmlFor="contact-name" className="input-label">Name</label>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Email Input */}
            <div className="input-group">
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`underline-input ${errors.email ? 'has-error' : ''}`}
                placeholder=" "
                required
              />
              <label htmlFor="contact-email" className="input-label">Email</label>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Message Input */}
            <div className="input-group">
              <textarea
                id="contact-message"
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleInputChange}
                className={`underline-input underline-textarea ${errors.message ? 'has-error' : ''}`}
                placeholder=" "
                required
              ></textarea>
              <label htmlFor="contact-message" className="input-label">Message</label>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            {status.submitted && (
              <div className={`status-alert ${status.success ? 'success' : 'pending'}`}>
                {status.message}
              </div>
            )}
            
            <button type="submit" className="btn btn-primary contact-submit-btn">
              Submit
            </button>

          </div>
          
        </form>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding-top: 100px;
          padding-bottom: 120px;
        }

        .contact-grid {
          gap: 60px;
          align-items: flex-start;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .contact-badge-text {
          font-family: var(--font-title);
          font-size: 0.95rem;
          color: var(--accent-coral);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .contact-title {
          font-size: 2.8rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 40px;
          color: var(--text-primary);
        }

        .contact-submit-btn {
          padding: 14px 40px;
          font-size: 1.05rem;
          align-self: flex-start;
        }

        .status-alert {
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          margin-bottom: 8px;
          width: 100%;
          border: 1px solid;
        }

        .status-alert.success {
          background-color: rgba(39, 201, 63, 0.08);
          border-color: rgba(39, 201, 63, 0.25);
          color: #27c93f;
        }

        .status-alert.pending {
          background-color: rgba(255, 95, 64, 0.08);
          border-color: rgba(255, 95, 64, 0.25);
          color: var(--accent-coral);
        }

        /* Right Column Form Inputs */
        .contact-fields {
          display: flex;
          flex-direction: column;
          gap: 40px;
          width: 100%;
          padding-top: 20px;
        }

        .input-group {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .underline-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 1.1rem;
          padding: 8px 0;
          outline: none;
          transition: var(--transition-normal);
          width: 100%;
        }

        .underline-textarea {
          resize: none;
          min-height: 80px;
        }

        .underline-input:focus {
          border-bottom-color: var(--accent-coral);
        }

        .underline-input.has-error {
          border-bottom-color: #ff5f56;
        }

        /* Label float effect */
        .input-label {
          position: absolute;
          left: 0;
          top: 8px;
          font-size: 1.1rem;
          color: var(--text-secondary);
          pointer-events: none;
          transition: var(--transition-normal);
        }

        /* Float the label when input is focused or not empty */
        .underline-input:focus ~ .input-label,
        .underline-input:not(:placeholder-shown) ~ .input-label {
          top: -20px;
          font-size: 0.82rem;
          color: var(--accent-coral);
          font-weight: 500;
        }

        .error-message {
          font-size: 0.8rem;
          color: #ff5f56;
          margin-top: 6px;
        }

        @media (max-width: 900px) {
          .contact-section {
            padding-top: 60px;
            padding-bottom: 70px;
          }
          .contact-title {
            font-size: 2.2rem;
            margin-bottom: 25px;
          }
          
          .contact-submit-btn {
            width: 100%;
            align-self: stretch;
            margin-top: 10px;
          }
          
          .contact-fields {
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .contact-info {
            align-items: center;
            text-align: center;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
