'use client';

import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronDown, Calendar, CheckCircle } from 'lucide-react';
import contactImg from '../../../assets/home/contact.webp';
import './InduCoralBookingForm.css';
import Image from 'next/image';
import {
  sanitizePhoneInput,
  validatePhone,
  validateName,
  validateEmail,
  validateRequired,
} from '../../../utils/formValidation';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  unitPreference: string;
  visitDate: string;
  message: string;
}

const initialFormState: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  unitPreference: '2BHK',
  visitDate: '',
  message: '',
};

export const InduCoralBookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);

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

    const dateErr = validateRequired(formData.visitDate, 'Preferred visit date');
    if (dateErr) nextErrors.visitDate = dateErr;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setErrorMessage('Please fill in the highlighted required fields.');
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
          projectType: `Indu Coral (${formData.unitPreference})`,
          subject: `Indu Coral Site Visit - ${formData.unitPreference}`,
          message: `Unit Preference: ${formData.unitPreference}\nPreferred Visit Date: ${formData.visitDate}\n\nClient Notes:\n${formData.message || 'None provided'}`,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Failed to submit visit request. Please try again.');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData(initialFormState);
      }, 6000);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred while booking your visit.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="coral-booking-section" id="contact">
      <div className="coral-booking-container">
        {/* Header: Tag + Title */}
        <div className="coral-booking-header">
          <div className="coral-booking-tag">
            <span className="coral-booking-tag-dot" aria-hidden="true" />
            <span className="coral-booking-tag-text">Book a Visit</span>
          </div>

          <h2 className="coral-booking-title">Let&apos;s Plan Your Site Visit</h2>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="coral-booking-grid">
          {/* Left Column: Living Room Image */}
          <div className="coral-booking-image-col">
            <div className="coral-booking-image-wrapper">
              <Image
                src={contactImg}
                alt="Luxury Modern Living Room - Indu Coral"
                className="coral-booking-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="coral-booking-form-col">
            <div className="coral-booking-form-card">
              {submitted ? (
                <div className="coral-booking-success">
                  <div className="coral-booking-success-icon">
                    <CheckCircle size={44} strokeWidth={2} />
                  </div>
                  <h3 className="coral-booking-success-title">Visit Request Received!</h3>
                  <p className="coral-booking-success-text">
                    Thank you, <strong>{formData.name || 'Valued Visitor'}</strong>! Our Indu Coral team will contact you shortly at <strong>+91 {formData.phone}</strong> to confirm your site visit slot.
                  </p>
                </div>
              ) : (
                <form className="coral-booking-form" onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="coral-form-group">
                    <label htmlFor="coral-booking-name" className="coral-form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="coral-booking-name"
                      name="name"
                      className={`coral-form-input ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <span className="coral-form-field-error">{errors.name}</span>}
                  </div>

                  {/* 2-Column Row: Email Address & Mobile Number */}
                  <div className="coral-form-row">
                    <div className="coral-form-group">
                      <label htmlFor="coral-booking-email" className="coral-form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="coral-booking-email"
                        name="email"
                        className={`coral-form-input ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="name@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {errors.email && <span className="coral-form-field-error">{errors.email}</span>}
                    </div>

                    <div className="coral-form-group">
                      <label htmlFor="coral-booking-phone" className="coral-form-label">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        id="coral-booking-phone"
                        name="phone"
                        className={`coral-form-input ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={10}
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        required
                      />
                      {errors.phone && <span className="coral-form-field-error">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Unit Preference */}
                  <div className="coral-form-group">
                    <label htmlFor="coral-unit-preference" className="coral-form-label">
                      Unit preference
                    </label>
                    <div className="coral-select-wrapper">
                      <select
                        id="coral-unit-preference"
                        name="unitPreference"
                        className="coral-form-select"
                        value={formData.unitPreference}
                        onChange={handleChange}
                        required
                      >
                        <option value="2BHK">2BHK</option>
                        <option value="3BHK">3BHK</option>
                        <option value="3BHK Luxury">3BHK Luxury</option>
                      </select>
                      <span className="coral-select-chevron" aria-hidden="true">
                        <ChevronDown size={18} strokeWidth={2.2} />
                      </span>
                    </div>
                  </div>

                  {/* Preferred Visit Date */}
                  <div className="coral-form-group">
                    <label htmlFor="coral-visit-date" className="coral-form-label">
                      Preferred Visit Date
                    </label>
                    <div
                      className="coral-date-wrapper"
                      onClick={() => {
                        try {
                          dateInputRef.current?.showPicker?.();
                        } catch {
                          dateInputRef.current?.focus();
                        }
                      }}
                    >
                      <input
                        ref={dateInputRef}
                        type="date"
                        id="coral-visit-date"
                        name="visitDate"
                        className={`coral-form-input coral-date-input ${errors.visitDate ? 'is-invalid' : ''}`}
                        value={formData.visitDate}
                        onChange={handleChange}
                        required
                      />
                      <span className="coral-date-icon" aria-hidden="true">
                        <Calendar size={18} strokeWidth={2} />
                      </span>
                    </div>
                    {errors.visitDate && <span className="coral-form-field-error">{errors.visitDate}</span>}
                  </div>

                  {/* Message (optional) */}
                  <div className="coral-form-group">
                    <label htmlFor="coral-message" className="coral-form-label">
                      Message (optional)
                    </label>
                    <textarea
                      id="coral-message"
                      name="message"
                      className="coral-form-textarea"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  {errorMessage && (
                    <div style={{ color: '#dc2626', fontSize: '13px', marginBottom: '10px', fontWeight: 500 }}>
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Action Row */}
                  <div className="coral-booking-submit-row">
                    <button
                      type="submit"
                      className="btn-primary-blue coral-booking-submit-btn"
                      disabled={isSubmitting}
                    >
                      <span>{isSubmitting ? 'Booking Visit...' : "Book Site Visit"}</span>
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

export default InduCoralBookingForm;
