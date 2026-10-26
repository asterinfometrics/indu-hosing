'use client';

import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronDown, Upload } from 'lucide-react';
import livingRoomImg from '../../../assets/career/career-application.webp';
import './ApplySection.css';
import Image from 'next/image';
import {
  sanitizePhoneInput,
  validatePhone,
  validateName,
  validateEmail,
  validateRequired,
} from '../../../utils/formValidation';

export const ApplySection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Civil Engineer',
    coverLetter: '',
  });
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
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

    const posErr = validateRequired(formData.position, 'Position');
    if (posErr) nextErrors.position = posErr;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setErrorMessage('Please fill in the highlighted fields correctly.');
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const messageContent = [
        `Position Applied For: ${formData.position}`,
        `Resume File Attached/Provided: ${fileName || 'None attached'}`,
        `Cover Letter / Notes:\n${formData.coverLetter || 'None provided'}`,
      ].join('\n');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: 'career',
          subject: `Career Application: ${formData.position} - ${formData.name}`,
          message: messageContent,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Failed to submit application. Please try again.');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: 'Civil Engineer',
        coverLetter: '',
      });
      setFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred while submitting your application.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="apply-section" id="apply-team">
      <div className="apply-container">
        {/* Header: Tag + Title */}
        <div className="apply-header">
          <div className="apply-tag">
            <span className="apply-tag-square" aria-hidden="true" />
            <span className="apply-tag-text">Careers</span>
          </div>

          <h2 className="apply-title">Apply to join our team</h2>
        </div>

        {/* 2-Column Grid: Image Left, Form Card Right */}
        <div className="apply-grid">
          {/* Left Column: Living Room Image */}
          <div className="apply-image-col">
            <div className="apply-image-wrapper">
              <Image  
                src={livingRoomImg}
                alt="Indu Housing Modern Living Space"
                className="apply-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="apply-form-col">
            <div className="apply-form-card">
              <form className="apply-form" onSubmit={handleSubmit}>
                {/* 1. Name */}
                <div className="apply-form-group">
                  <label htmlFor="apply-name" className="apply-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="apply-name"
                    name="name"
                    className={`apply-input ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <span className="apply-field-error">{errors.name}</span>}
                </div>

                {/* 2. Email Address & Mobile Number (2 columns) */}
                <div className="apply-form-row">
                  <div className="apply-form-group">
                    <label htmlFor="apply-email" className="apply-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="apply-email"
                      name="email"
                      className={`apply-input ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <span className="apply-field-error">{errors.email}</span>}
                  </div>

                  <div className="apply-form-group">
                    <label htmlFor="apply-phone" className="apply-label">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="apply-phone"
                      name="phone"
                      className={`apply-input ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={10}
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      required
                    />
                    {errors.phone && <span className="apply-field-error">{errors.phone}</span>}
                  </div>
                </div>

                {/* 3. Position applying for */}
                <div className="apply-form-group">
                  <label htmlFor="apply-position" className="apply-label">
                    Position applying for
                  </label>
                  <div className="apply-select-wrapper">
                    <select
                      id="apply-position"
                      name="position"
                      className="apply-select"
                      value={formData.position}
                      onChange={handleChange}
                      required
                    >
                      <option value="Civil Engineer">Civil Engineer</option>
                      <option value="Architect">Architect</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Site Supervisor">Site Supervisor</option>
                      <option value="Interior Designer">Interior Designer</option>
                      <option value="Quantity Surveyor">Quantity Surveyor</option>
                      <option value="Sales & Marketing">Sales &amp; Marketing</option>
                    </select>
                    <span className="apply-select-chevron" aria-hidden="true">
                      <ChevronDown size={17} strokeWidth={2.2} />
                    </span>
                  </div>
                </div>

                {/* 4. Resume / CV */}
                <div className="apply-form-group">
                  <label htmlFor="apply-resume" className="apply-label">
                    Resume / CV
                  </label>
                  <div
                    className="apply-upload-wrapper"
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        fileInputRef.current?.click();
                      }
                    }}
                  >
                    <input
                      type="file"
                      id="apply-resume"
                      name="resume"
                      ref={fileInputRef}
                      className="apply-file-input"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                    />
                    <span className={`apply-upload-text ${fileName ? 'has-file' : ''}`}>
                      {fileName || 'Upload Resume'}
                    </span>
                    <span className="apply-upload-icon" aria-hidden="true">
                      <Upload size={17} strokeWidth={2.2} />
                    </span>
                  </div>
                </div>

                {/* 5. Cover letter (optional) */}
                <div className="apply-form-group">
                  <label htmlFor="apply-cover-letter" className="apply-label">
                    Cover letter (optional)
                  </label>
                  <textarea
                    id="apply-cover-letter"
                    name="coverLetter"
                    className="apply-textarea"
                    placeholder="Tell us why you'd like to join Indu Housing"
                    rows={4}
                    value={formData.coverLetter}
                    onChange={handleChange}
                  />
                </div>

                {errorMessage && (
                  <div style={{ color: '#dc2626', fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>
                    {errorMessage}
                  </div>
                )}

                {/* 6. Submit Button Row */}
                <div className="apply-submit-row">
                  {submitted && (
                    <span className="apply-success-msg">
                      Thank you! Your application has been submitted successfully.
                    </span>
                  )}
                  <button
                    type="submit"
                    className="btn-primary-blue apply-submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                    <span className="btn-icon-box">
                      <ArrowRight size={16} strokeWidth={2.2} />
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

export default ApplySection;
