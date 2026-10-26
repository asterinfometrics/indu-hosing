'use client';

import React, { useState } from 'react';
import partnerWithUsImg from '../../../assets/joint-ventures/partner-with-us.webp';
import './JointVenturesForm.css';
import Image from 'next/image';
import {
  sanitizePhoneInput,
  validatePhone,
  validateName,
  validateEmail,
  validateRequired,
} from '../../../utils/formValidation';

interface JVFormData {
  name: string;
  phone: string;
  email: string;
  propertyName: string;
  propertyAddress: string;
  propertySize: string;
  dimensions: string;
  notes: string;
}

const initialFormState: JVFormData = {
  name: '',
  phone: '',
  email: '',
  propertyName: '',
  propertyAddress: '',
  propertySize: '',
  dimensions: '',
  notes: '',
};

export const JointVenturesForm: React.FC = () => {
  const [formData, setFormData] = useState<JVFormData>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    const addrErr = validateRequired(formData.propertyAddress, 'Property address');
    if (addrErr) nextErrors.propertyAddress = addrErr;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setErrorMessage('Please fill in the required fields highlighted below.');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const messageContent = [
        `Property Name: ${formData.propertyName || 'N/A'}`,
        `Property Address: ${formData.propertyAddress}`,
        `Property Size: ${formData.propertySize || 'N/A'}`,
        `Dimensions: ${formData.dimensions || 'N/A'}`,
        `Additional Notes:\n${formData.notes || 'None provided'}`,
      ].join('\n');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: 'joint-venture',
          subject: 'Joint Venture Proposal',
          message: messageContent,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Failed to submit proposal. Please try again.');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData(initialFormState);
      }, 5000);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred while submitting your proposal.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="jv-form-section" id="jv-partner-form">
      <div className="jv-form-container">
        {/* Section Header */}
        <div className="jv-form-header">
          <div className="jv-form-badge">
            <span className="jv-form-badge-dot" aria-hidden="true" />
            <span>Partner With Us</span>
          </div>
          <h2 className="jv-form-title">Tell Us About Your Property</h2>
        </div>

        {/* 2-Column Content: Left Image Card + Right Form Card */}
        <div className="jv-form-grid">
          {/* Left Column: Image Card */}
          <div className="jv-form-image-col">
            <div className="jv-form-image-card">
              <Image
                src={partnerWithUsImg}
                alt="Business partners shaking hands over blueprints and architectural scale model"
                className="jv-form-img"
              />
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="jv-form-card">
            {submitted ? (
              <div className="jv-form-success">
                <div className="jv-success-icon-badge">✓</div>
                <h3>Thank you for your enquiry!</h3>
                <p>
                  Our joint venture specialists will review your property details and contact you shortly with honest guidance.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="jv-property-form">
                {/* Row 1: Name & Mobile number */}
                <div className="jv-form-row">
                  <div className="jv-form-field">
                    <label htmlFor="jv-name" className="jv-form-label">
                      Name
                    </label>
                    <input
                      id="jv-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`jv-form-input ${errors.name ? 'is-invalid' : ''}`}
                      required
                    />
                    {errors.name && <span className="jv-form-field-error">{errors.name}</span>}
                  </div>
                  <div className="jv-form-field">
                    <label htmlFor="jv-phone" className="jv-form-label">
                      Mobile number
                    </label>
                    <input
                      id="jv-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={`jv-form-input ${errors.phone ? 'is-invalid' : ''}`}
                      maxLength={10}
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      required
                    />
                    {errors.phone && <span className="jv-form-field-error">{errors.phone}</span>}
                  </div>
                </div>

                {/* Row 2: Email address & Property name */}
                <div className="jv-form-row">
                  <div className="jv-form-field">
                    <label htmlFor="jv-email" className="jv-form-label">
                      Email address
                    </label>
                    <input
                      id="jv-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@email.com"
                      className={`jv-form-input ${errors.email ? 'is-invalid' : ''}`}
                      required
                    />
                    {errors.email && <span className="jv-form-field-error">{errors.email}</span>}
                  </div>
                  <div className="jv-form-field">
                    <label htmlFor="jv-property-name" className="jv-form-label">
                      Property name
                    </label>
                    <input
                      id="jv-property-name"
                      type="text"
                      name="propertyName"
                      value={formData.propertyName}
                      onChange={handleChange}
                      placeholder="e.g. Green Acres"
                      className="jv-form-input"
                    />
                  </div>
                </div>

                {/* Row 3: Property address (full width) */}
                <div className="jv-form-field full-width">
                  <label htmlFor="jv-property-address" className="jv-form-label">
                    Property address
                  </label>
                  <input
                    id="jv-property-address"
                    type="text"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleChange}
                    placeholder="Enter street, locality, city"
                    className={`jv-form-input ${errors.propertyAddress ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.propertyAddress && (
                    <span className="jv-form-field-error">{errors.propertyAddress}</span>
                  )}
                </div>

                {/* Row 4: Property size & Dimensions */}
                <div className="jv-form-row">
                  <div className="jv-form-field">
                    <label htmlFor="jv-property-size" className="jv-form-label">
                      Property size
                    </label>
                    <input
                      id="jv-property-size"
                      type="text"
                      name="propertySize"
                      value={formData.propertySize}
                      onChange={handleChange}
                      placeholder="e.g. 2400 sq.ft or 1 Ground"
                      className="jv-form-input"
                    />
                  </div>
                  <div className="jv-form-field">
                    <label htmlFor="jv-dimensions" className="jv-form-label">
                      Dimensions
                    </label>
                    <input
                      id="jv-dimensions"
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      placeholder="e.g. 40 x 60 ft"
                      className="jv-form-input"
                    />
                  </div>
                </div>

                {/* Row 5: Anything else we should know? */}
                <div className="jv-form-field full-width">
                  <label htmlFor="jv-notes" className="jv-form-label">
                    Anything else we should know?
                  </label>
                  <textarea
                    id="jv-notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    className="jv-form-textarea"
                  />
                </div>

                {errorMessage && (
                  <div style={{ color: '#dc2626', fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>
                    {errorMessage}
                  </div>
                )}

                {/* Submit Action */}
                <div className="jv-form-actions">
                  <button
                    type="submit"
                    className="btn-primary-blue jv-submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry'}</span>
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
    </section>
  );
};

export default JointVenturesForm;
