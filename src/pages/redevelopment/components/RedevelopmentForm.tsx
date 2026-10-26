'use client';

import React, { useState } from 'react';
import partnerImg from '../../../assets/partner/partner-with-us.webp';
import './RedevelopmentForm.css';
import Image from 'next/image';
import {
  sanitizePhoneInput,
  validatePhone,
  validateName,
  validateEmail,
  validateRequired,
} from '../../../utils/formValidation';

interface RedevelopmentFormData {
  name: string;
  phone: string;
  email: string;
  currentStructure: string;
  address: string;
  propertySize: string;
  buildingAge: string;
  existingUnits: string;
  numberOfOwners: string;
  notes: string;
}

const initialFormState: RedevelopmentFormData = {
  name: '',
  phone: '',
  email: '',
  currentStructure: '',
  address: '',
  propertySize: '',
  buildingAge: '',
  existingUnits: '',
  numberOfOwners: '',
  notes: '',
};

export const RedevelopmentForm: React.FC = () => {
  const [formData, setFormData] = useState<RedevelopmentFormData>(initialFormState);
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

    const structErr = validateRequired(formData.currentStructure, 'Current structure');
    if (structErr) nextErrors.currentStructure = structErr;

    const addrErr = validateRequired(formData.address, 'Property address');
    if (addrErr) nextErrors.address = addrErr;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setErrorMessage('Please correct the highlighted fields before submitting.');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const messageContent = [
        `Current Structure: ${formData.currentStructure}`,
        `Property Address: ${formData.address}`,
        `Property Size: ${formData.propertySize || 'N/A'}`,
        `Approximate Age: ${formData.buildingAge || 'N/A'}`,
        `Existing Units: ${formData.existingUnits || 'N/A'}`,
        `Number of Owners: ${formData.numberOfOwners || 'N/A'}`,
        `Additional Notes:\n${formData.notes || 'None provided'}`,
      ].join('\n');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: 'redevelopment',
          subject: 'Redevelopment Proposal Enquiry',
          message: messageContent,
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
        err instanceof Error ? err.message : 'An error occurred while submitting your details.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="redevelopment-form-section" id="redevelopment-form">
      <div className="redevelopment-form-container">
        {/* Section Header */}
        <div className="redevelopment-form-header">
          <div className="redevelopment-form-badge">
            <span className="redevelopment-form-badge-dot" aria-hidden="true" />
            <span>Redevelopment</span>
          </div>
          <h2 className="redevelopment-form-title">Tell us about your rebuild</h2>
        </div>

        {/* 2-Column Content: Left Image Card + Right Form Card */}
        <div className="redevelopment-form-grid">
          {/* Left Column: Image Card */}
          <div className="redevelopment-form-image-col">
            <div className="redevelopment-form-image-card">
              <Image
                src={partnerImg}
                alt="Architects and clients discussing redevelopment plans"
                className="redevelopment-form-img"
              />
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="redevelopment-form-card">
            {submitted ? (
              <div className="redevelopment-form-success">
                <div className="redevelopment-success-icon-badge">✓</div>
                <h3>Thank you for your enquiry!</h3>
                <p>
                  Our redevelopment experts will review your property details and contact you shortly with honest guidance.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="redevelopment-property-form">
                {/* Row 1: Name & Mobile number */}
                <div className="redevelopment-form-row">
                  <div className="redevelopment-form-field">
                    <label htmlFor="rd-name" className="redevelopment-form-label">
                      Name
                    </label>
                    <input
                      id="rd-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`redevelopment-form-input ${errors.name ? 'is-invalid' : ''}`}
                      required
                    />
                    {errors.name && <span className="redevelopment-form-field-error">{errors.name}</span>}
                  </div>
                  <div className="redevelopment-form-field">
                    <label htmlFor="rd-phone" className="redevelopment-form-label">
                      Mobile number
                    </label>
                    <input
                      id="rd-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={`redevelopment-form-input ${errors.phone ? 'is-invalid' : ''}`}
                      maxLength={10}
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      required
                    />
                    {errors.phone && <span className="redevelopment-form-field-error">{errors.phone}</span>}
                  </div>
                </div>

                {/* Row 2: Email address & Current structure */}
                <div className="redevelopment-form-row">
                  <div className="redevelopment-form-field">
                    <label htmlFor="rd-email" className="redevelopment-form-label">
                      Email address
                    </label>
                    <input
                      id="rd-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@email.com"
                      className={`redevelopment-form-input ${errors.email ? 'is-invalid' : ''}`}
                      required
                    />
                    {errors.email && <span className="redevelopment-form-field-error">{errors.email}</span>}
                  </div>
                  <div className="redevelopment-form-field">
                    <label htmlFor="rd-structure" className="redevelopment-form-label">
                      Current structure
                    </label>
                    <div className="redevelopment-select-wrapper">
                      <select
                        id="rd-structure"
                        name="currentStructure"
                        value={formData.currentStructure}
                        onChange={handleChange}
                        className={`redevelopment-form-select ${!formData.currentStructure ? 'redevelopment-select-placeholder' : ''} ${errors.currentStructure ? 'is-invalid' : ''}`}
                        required
                      >
                        <option value="" disabled hidden>
                          Select an Option
                        </option>
                        <option value="Independent House / Villa">Independent House / Villa</option>
                        <option value="Old Apartment Complex">Old Apartment Complex</option>
                        <option value="Vacant Plot / Land">Vacant Plot / Land</option>
                        <option value="Commercial / Mixed-Use">Commercial / Mixed-Use</option>
                      </select>
                    </div>
                    {errors.currentStructure && <span className="redevelopment-form-field-error">{errors.currentStructure}</span>}
                  </div>
                </div>

                {/* Row 3: Property address (full width) */}
                <div className="redevelopment-form-field full-width">
                  <label htmlFor="rd-address" className="redevelopment-form-label">
                    Property address
                  </label>
                  <input
                    id="rd-address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter street, locality, city"
                    className={`redevelopment-form-input ${errors.address ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.address && <span className="redevelopment-form-field-error">{errors.address}</span>}
                </div>

                {/* Row 4: Property size & Building age */}
                <div className="redevelopment-form-row">
                  <div className="redevelopment-form-field">
                    <label htmlFor="rd-size" className="redevelopment-form-label">
                      Property size
                    </label>
                    <input
                      id="rd-size"
                      type="text"
                      name="propertySize"
                      value={formData.propertySize}
                      onChange={handleChange}
                      placeholder="e.g. 2400 sq.ft or 1 Ground"
                      className="redevelopment-form-input"
                    />
                  </div>
                  <div className="redevelopment-form-field">
                    <label htmlFor="rd-age" className="redevelopment-form-label">
                      Building age
                    </label>
                    <input
                      id="rd-age"
                      type="text"
                      name="buildingAge"
                      value={formData.buildingAge}
                      onChange={handleChange}
                      placeholder="e.g. 25 years"
                      className="redevelopment-form-input"
                    />
                  </div>
                </div>

                {/* Row 5: Existing units & Number of owners */}
                <div className="redevelopment-form-row">
                  <div className="redevelopment-form-field">
                    <label htmlFor="rd-units" className="redevelopment-form-label">
                      Existing units
                    </label>
                    <input
                      id="rd-units"
                      type="text"
                      name="existingUnits"
                      value={formData.existingUnits}
                      onChange={handleChange}
                      placeholder="e.g. 6 units, G+2"
                      className="redevelopment-form-input"
                    />
                  </div>
                  <div className="redevelopment-form-field">
                    <label htmlFor="rd-owners" className="redevelopment-form-label">
                      Number of owners
                    </label>
                    <input
                      id="rd-owners"
                      type="text"
                      name="numberOfOwners"
                      value={formData.numberOfOwners}
                      onChange={handleChange}
                      placeholder="e.g. 5"
                      className="redevelopment-form-input"
                    />
                  </div>
                </div>

                {/* Row 6: Anything else we should know? */}
                <div className="redevelopment-form-field full-width">
                  <label htmlFor="rd-notes" className="redevelopment-form-label">
                    Anything else we should know?
                  </label>
                  <textarea
                    id="rd-notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    className="redevelopment-form-textarea"
                  />
                </div>

                {errorMessage && (
                  <div style={{ color: '#dc2626', fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>
                    {errorMessage}
                  </div>
                )}

                {/* Submit Action */}
                <div className="redevelopment-form-actions">
                  <button
                    type="submit"
                    className="btn-primary-blue redevelopment-submit-btn"
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

export default RedevelopmentForm;
