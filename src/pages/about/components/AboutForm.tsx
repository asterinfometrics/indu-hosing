'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';
import contactImg from '../../../assets/home/contact.webp';
import './AboutForm.css';
import Image from 'next/image';
import {
  sanitizePhoneInput,
  validatePhone,
  validateName,
  validateEmail,
  validateRequired,
} from '../../../utils/formValidation';

interface AboutFormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  consultationNotes: string;
}

const initialFormState: AboutFormState = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  consultationNotes: '',
};

export const AboutForm: React.FC = () => {
  const [formData, setFormData] = useState<AboutFormState>(initialFormState);
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

    const nextErrors: Record<string, string> = {};
    const nameErr = validateName(formData.name);
    if (nameErr) nextErrors.name = nameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) nextErrors.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) nextErrors.phone = phoneErr;

    const projErr = validateRequired(formData.projectType, 'Project Type');
    if (projErr) nextErrors.projectType = projErr;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setErrorMessage('Please fill in the highlighted fields correctly.');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          subject: `Enquiry from About Page - ${formData.projectType}`,
          message: formData.consultationNotes || 'General consultation request from About page.',
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Failed to submit enquiry. Please try again.');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData(initialFormState);
      }, 5000);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred while sending your enquiry.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="about-form-section" id="contact">
      <div className="about-form-container">
        {/* Header: Tag + Title */}
        <div className="about-form-header">
          <div className="about-form-tag">
            <span className="about-form-tag-dot" aria-hidden="true" />
            <span className="about-form-tag-text">Get Started</span>
          </div>

          <h2 className="about-form-title">Your Home Starts Here</h2>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="about-form-grid">
          {/* Left Column: Living Room Image */}
          <div className="about-form-image-col">
            <div className="about-form-image-wrapper">
              <Image
                src={contactImg}
                alt="Modern Living Room - Indu Housing"
                className="about-form-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="about-form-col">
            <div className="about-form-card">
              {submitted ? (
                <div className="about-form-success">
                  <div className="about-form-success-icon">
                    <CheckCircle size={44} strokeWidth={2} />
                  </div>
                  <h3 className="about-form-success-title">Thank you for reaching out!</h3>
                  <p className="about-form-success-text">
                    We have received your details. Our housing consultants will connect with you shortly to assist with your dream home project.
                  </p>
                </div>
              ) : (
                <form className="about-project-form" onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="about-field-group">
                    <label htmlFor="about-name" className="about-field-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="about-name"
                      name="name"
                      className={`about-field-input ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <span className="about-field-error">{errors.name}</span>}
                  </div>

                  {/* Email Address */}
                  <div className="about-field-group">
                    <label htmlFor="about-email" className="about-field-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="about-email"
                      name="email"
                      className={`about-field-input ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <span className="about-field-error">{errors.email}</span>}
                  </div>

                  {/* Mobile Number */}
                  <div className="about-field-group">
                    <label htmlFor="about-phone" className="about-field-label">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="about-phone"
                      name="phone"
                      className={`about-field-input ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={10}
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      required
                    />
                    {errors.phone && <span className="about-field-error">{errors.phone}</span>}
                  </div>

                  {/* Project Type */}
                  <div className="about-field-group">
                    <label htmlFor="about-project-type" className="about-field-label">
                      Project Type
                    </label>
                    <div className="about-select-wrapper">
                      <select
                        id="about-project-type"
                        name="projectType"
                        className={`about-field-select ${!formData.projectType ? 'select-empty' : ''} ${errors.projectType ? 'is-invalid' : ''}`}
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled hidden>Select Project Type</option>
                        <option value="luxury-villa">Standalone Luxury Villa</option>
                        <option value="residential-apartment">Residential Apartment</option>
                        <option value="independent-home">Independent Home</option>
                        <option value="joint-venture">Joint Venture / Plot Promotion</option>
                        <option value="consultation">General Consultation &amp; Architectural Planning</option>
                      </select>
                      <span className="about-select-chevron" aria-hidden="true">
                        <ChevronDown size={18} strokeWidth={2.2} />
                      </span>
                    </div>
                    {errors.projectType && <span className="about-field-error">{errors.projectType}</span>}
                  </div>

                  {/* Get Free Consultation */}
                  <div className="about-field-group">
                    <label htmlFor="about-consultation" className="about-field-label">
                      Get Free Consultation
                    </label>
                    <textarea
                      id="about-consultation"
                      name="consultationNotes"
                      className="about-field-textarea"
                      rows={4}
                      value={formData.consultationNotes}
                      onChange={handleChange}
                    />
                  </div>

                  {errorMessage && (
                    <div style={{ color: '#dc2626', fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Action */}
                  <div className="about-submit-row">
                    <button
                      type="submit"
                      className="btn-primary-blue about-submit-btn"
                      disabled={isSubmitting}
                    >
                      <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                      <span className="btn-icon-box">
                        <ArrowRight size={15} strokeWidth={2.2} />
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

export default AboutForm;
