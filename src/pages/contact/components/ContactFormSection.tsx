'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import './ContactFormSection.css';
import {
  sanitizePhoneInput,
  validatePhone,
  validateName,
  validateEmail,
  validateRequired,
} from '../../../utils/formValidation';

export const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    botField: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const sanitized = sanitizePhoneInput(value);
      setFormData((prev) => ({ ...prev, phone: sanitized }));
      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: '' }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate fields
    const nextErrors: Record<string, string> = {};
    const subjectErr = validateRequired(formData.subject, 'Subject');
    if (subjectErr) nextErrors.subject = subjectErr;

    const nameErr = validateName(formData.name);
    if (nameErr) nextErrors.name = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) nextErrors.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) nextErrors.phone = phoneErr;

    const messageErr = validateRequired(formData.message, 'Message');
    if (messageErr) nextErrors.message = messageErr;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setErrorMessage('Please correct the highlighted fields before submitting.');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Failed to submit enquiry. Please try again.');
      }

      setSubmitted(true);
      setFormData({
        subject: '',
        name: '',
        email: '',
        phone: '',
        message: '',
        botField: '',
      });
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred while sending your enquiry.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section" id="contact-form">
      <div className="contact-form-container">
        <div className="contact-form-grid">
          {/* Left Column: Contact Cards + Interactive Map */}
          <div className="contact-info-column">
            {/* Contact Information List */}
            <div className="contact-info-list">
              {/* 1. Phone */}
              <div className="contact-info-card">
                <div className="contact-info-icon-box" aria-hidden="true">
                  <Phone size={20} strokeWidth={2.2} />
                </div>
                <div className="contact-info-text-group">
                  <span className="contact-info-label">Phone</span>
                  <a href="tel:+919841885651" className="contact-info-val">+91 90879 90022</a>
                  <a href="tel:+919841222449" className="contact-info-val">+91 98412 22449</a>
                </div>
              </div>

              {/* 2. E-Mail */}
              <div className="contact-info-card">
                <div className="contact-info-icon-box" aria-hidden="true">
                  <Mail size={20} strokeWidth={2.2} />
                </div>
                <div className="contact-info-text-group">
                  <span className="contact-info-label">E-Mail</span>
                  <a href="mailto:marketing@induhousing.com" className="contact-info-val">marketing@induhousing.com</a>
                </div>
              </div>

              {/* 3. Location */}
              <div className="contact-info-card">
                <div className="contact-info-icon-box" aria-hidden="true">
                  <MapPin size={20} strokeWidth={2.2} />
                </div>
                <div className="contact-info-text-group">
                  <span className="contact-info-label">Location</span>
                  <p className="contact-info-val-address">
                    Old No. T-67-B, New No.32, 32nd Cross Street,<br />
                    Besant Nagar, Chennai – 600090, Tamil Nadu
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="contact-map-card">
              <iframe
                title="Indu Housing Development Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5324241704643!2d80.26676507505184!3d13.001730614216955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525fb693f30775%3A0x85415ea33012fe48!2sIndu%20Housing%20Development%20(Chennai)%20Private%20Limited!5e0!3m2!1sen!2sin!4v1791109481854!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="contact-form-column">
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-form-success">
                  <div className="success-icon-badge">✓</div>
                  <h3>Thank you for reaching out!</h3>
                  <p>Our team will get back to you shortly with straight answers, not a sales pitch.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-element">
                  {/* Subject Dropdown */}
                  <div className="contact-form-field">
                    <label htmlFor="contact-subject" className="contact-form-label">
                      Subject
                    </label>
                    <div className="contact-select-wrapper">
                      <select
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`contact-form-select ${errors.subject ? 'is-invalid' : ''}`}
                        required
                      >
                        <option value="" disabled hidden>Select Subject</option>
                        <option value="New Project Consultation">New Project Consultation</option>
                        <option value="Independent Villa Inquiry">Independent Villa Inquiry</option>
                        <option value="Luxury Apartments">Luxury Apartments</option>
                        <option value="Joint Venture Proposal">Joint Venture Proposal</option>
                        <option value="Site Visit Booking">Site Visit Booking</option>
                        <option value="General Query">General Query</option>
                      </select>
                      <ChevronDown size={18} className="contact-select-chevron" aria-hidden="true" />
                    </div>
                    {errors.subject && <span className="contact-form-field-error">{errors.subject}</span>}
                  </div>

                  {/* Name Input */}
                  <div className="contact-form-field">
                    <label htmlFor="contact-name" className="contact-form-label">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`contact-form-input ${errors.name ? 'is-invalid' : ''}`}
                      required
                    />
                    {errors.name && <span className="contact-form-field-error">{errors.name}</span>}
                  </div>

                  {/* Email Input */}
                  <div className="contact-form-field">
                    <label htmlFor="contact-email" className="contact-form-label">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@email.com"
                      className={`contact-form-input ${errors.email ? 'is-invalid' : ''}`}
                      required
                    />
                    {errors.email && <span className="contact-form-field-error">{errors.email}</span>}
                  </div>

                  {/* Mobile Number Input */}
                  <div className="contact-form-field">
                    <label htmlFor="contact-phone" className="contact-form-label">
                      Mobile Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={`contact-form-input ${errors.phone ? 'is-invalid' : ''}`}
                      maxLength={10}
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      required
                    />
                    {errors.phone && <span className="contact-form-field-error">{errors.phone}</span>}
                  </div>

                  {/* Message Input */}
                  <div className="contact-form-field">
                    <label htmlFor="contact-message" className="contact-form-label">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`contact-form-textarea ${errors.message ? 'is-invalid' : ''}`}
                      required
                    />
                    {errors.message && <span className="contact-form-field-error">{errors.message}</span>}
                  </div>

                  {/* Honeypot Anti-Spam Field (hidden from real users) */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="contact-form-botfield">Leave blank</label>
                    <input
                      type="text"
                      id="contact-form-botfield"
                      name="botField"
                      value={formData.botField}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {errorMessage && (
                    <div style={{ color: '#dc2626', fontSize: '14px', marginBottom: '12px', fontWeight: 500 }}>
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit CTA Button */}
                  <div className="contact-form-btn-wrapper">
                    <button
                      type="submit"
                      className="btn-primary-blue contact-submit-btn"
                      disabled={isSubmitting}
                      style={isSubmitting ? { opacity: 0.7, cursor: 'not-allowed' } : undefined}
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Submit'}</span>
                      <span className="btn-icon-box">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
