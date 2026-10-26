'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';
import contactImg from '../../../assets/home/contact.webp';
import './CompletedProjectsForm.css';
import Image from 'next/image';
import {
  sanitizePhoneInput,
  validatePhone,
  validateName,
  validateEmail,
  validateRequired,
} from '../../../utils/formValidation';

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  consultationNotes: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  consultationNotes: '',
};

export const CompletedProjectsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
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
          subject: `Enquiry from Completed Projects - ${formData.projectType}`,
          message: formData.consultationNotes || 'Interested in projects by Indu Housing',
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
    <section className="completed-form-section" id="contact">
      <div className="completed-form-container">
        {/* Header: Tag + Title */}
        <div className="completed-form-header">
          <div className="completed-form-tag">
            <span className="completed-form-tag-dot" aria-hidden="true" />
            <span className="completed-form-tag-text">Get Started</span>
          </div>

          <h2 className="completed-form-title">Your Home Starts Here</h2>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="completed-form-grid">
          {/* Left Column: Living Room Image */}
          <div className="completed-form-image-col">
            <div className="completed-form-image-wrapper">
              <Image
                src={contactImg}
                alt="Modern Living Room - Indu Housing"
                className="completed-form-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="completed-form-col">
            <div className="completed-form-card">
              {submitted ? (
                <div className="completed-form-success">
                  <div className="completed-form-success-icon">
                    <CheckCircle size={44} strokeWidth={2} />
                  </div>
                  <h3 className="completed-form-success-title">Thank you for reaching out!</h3>
                  <p className="completed-form-success-text">
                    We have received your details. Our housing consultants will connect with you shortly to assist with your dream home project.
                  </p>
                </div>
              ) : (
                <form className="completed-project-form" onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="completed-field-group">
                    <label htmlFor="completed-name" className="completed-field-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="completed-name"
                      name="name"
                      className={`completed-field-input ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <span className="completed-field-error">{errors.name}</span>}
                  </div>

                  {/* Email Address */}
                  <div className="completed-field-group">
                    <label htmlFor="completed-email" className="completed-field-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="completed-email"
                      name="email"
                      className={`completed-field-input ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <span className="completed-field-error">{errors.email}</span>}
                  </div>

                  {/* Mobile Number */}
                  <div className="completed-field-group">
                    <label htmlFor="completed-phone" className="completed-field-label">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="completed-phone"
                      name="phone"
                      className={`completed-field-input ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={10}
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      required
                    />
                    {errors.phone && <span className="completed-field-error">{errors.phone}</span>}
                  </div>

                  {/* Project Type */}
                  <div className="completed-field-group">
                    <label htmlFor="completed-project-type" className="completed-field-label">
                      Project Type
                    </label>
                    <div className="completed-select-wrapper">
                      <select
                        id="completed-project-type"
                        name="projectType"
                        className={`completed-field-select ${!formData.projectType ? 'select-empty' : ''} ${errors.projectType ? 'is-invalid' : ''}`}
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
                      <span className="completed-select-chevron" aria-hidden="true">
                        <ChevronDown size={18} strokeWidth={2.2} />
                      </span>
                    </div>
                    {errors.projectType && <span className="completed-field-error">{errors.projectType}</span>}
                  </div>

                  {/* Get Free Consultation */}
                  <div className="completed-field-group">
                    <label htmlFor="completed-consultation" className="completed-field-label">
                      Get Free Consultation
                    </label>
                    <textarea
                      id="completed-consultation"
                      name="consultationNotes"
                      className="completed-field-textarea"
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
                  <div className="completed-submit-row">
                    <button
                      type="submit"
                      className="btn-primary-blue completed-submit-btn"
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

export default CompletedProjectsForm;
