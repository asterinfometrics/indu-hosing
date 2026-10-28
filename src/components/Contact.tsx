'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import contactImg from '../assets/home/contact.webp';
import './Contact.css';
import Image from 'next/image';
import {
  sanitizePhoneInput,
  validatePhone,
  validateName,
  validateEmail,
} from '../utils/formValidation';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    botField: '', // Honeypot field for spam prevention
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

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

    // Run field validations
    const nextErrors: Record<string, string> = {};
    const nameErr = validateName(formData.name);
    if (nameErr) nextErrors.name = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) nextErrors.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) nextErrors.phone = phoneErr;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatusType('error');
      setStatusMessage('Please enter valid details in the highlighted fields.');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatusType(null);
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Failed to send enquiry. Please try again.');
      }

      setStatusType('success');
      setStatusMessage(data.message || 'Thank you! We will reach out shortly to plan your visit.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
        botField: '',
      });
    } catch (err: unknown) {
      setStatusType('error');
      setStatusMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Header: Tag + Title */}
        <div className="contact-header">
          <div className="contact-tag">
            <span className="contact-tag-dot" aria-hidden="true" />
            <span className="contact-tag-text">Book a Visit</span>
          </div>

          <h2 className="contact-title">Let&apos;s Plan Your Site Visit</h2>
        </div>

        {/* 2-Column Layout: Left Image, Right Form Card */}
        <div className="contact-grid">
          {/* Left Column: Living Room Image */}
          <div className="contact-image-col">
            <div className="contact-image-wrapper">
              <Image
                src={contactImg}
                alt="Luxury Modern Living Room - Indu Housing"
                className="contact-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <form className="contact-form" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="contact-form-group">
                  <label htmlFor="contact-name" className="contact-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className={`contact-input ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <span className="contact-field-error">{errors.name}</span>}
                </div>

                {/* Email Address */}
                <div className="contact-form-group">
                  <label htmlFor="contact-email" className="contact-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className={`contact-input ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <span className="contact-field-error">{errors.email}</span>}
                </div>

                {/* Mobile Number */}
                <div className="contact-form-group">
                  <label htmlFor="contact-phone" className="contact-label">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    className={`contact-input ${errors.phone ? 'is-invalid' : ''}`}
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    required
                  />
                  {errors.phone && <span className="contact-field-error">{errors.phone}</span>}
                </div>

                {/* Project Type */}
                <div className="contact-form-group">
                  <label htmlFor="contact-project-type" className="contact-label">
                    Project Type
                  </label>
                  <div className="contact-select-wrapper">
                    <select
                      id="contact-project-type"
                      name="projectType"
                      className="contact-select"
                      value={formData.projectType}
                      onChange={handleChange}
                    >
                      <option value="" disabled hidden>
                        Select project type
                      </option>
                      <option value="luxury-villa">Independent Villas</option>
                      <option value="residential-apartment">Individual House</option>
                      <option value="independent-home">Building Apartments</option>
                      <option value="joint-venture">Joint Venture / Redevelopment</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                    <span className="contact-select-chevron" aria-hidden="true">
                      <ChevronDown size={17} strokeWidth={2.2} />
                    </span>
                  </div>
                </div>

                {/* Get Free Consultation */}
                <div className="contact-form-group">
                  <label htmlFor="contact-message" className="contact-label">
                    Get Free Consultation
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="contact-textarea"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {/* Honeypot anti-spam field (hidden from human visitors) */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="contact-botfield">Leave this field empty</label>
                  <input
                    type="text"
                    id="contact-botfield"
                    name="botField"
                    value={formData.botField}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Submit Action */}
                <div className="contact-submit-row">
                  {statusType === 'success' && (
                    <span className="contact-success-msg">
                      {statusMessage}
                    </span>
                  )}
                  {statusType === 'error' && (
                    <span className="contact-error-msg">
                      {statusMessage}
                    </span>
                  )}
                  <button
                    type="submit"
                    className="btn-primary-blue contact-submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Submit'}</span>
                    <span className="btn-icon-box">
                      <ArrowRight size={15} strokeWidth={2.2} />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
