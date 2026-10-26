/**
 * Shared Form Validation Utilities for Indu Housing
 */

/**
 * Restricts user input strictly to digits and caps length at 10 digits
 */
export const sanitizePhoneInput = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 10);
};

/**
 * Validates a 10-digit mobile number (standard Indian telecom format 6-9xxxxxxxx)
 */
export const validatePhone = (phone: string): string | null => {
  const digits = phone.replace(/\D/g, '');
  if (!digits) {
    return 'Mobile number is required.';
  }
  if (digits.length < 10) {
    return `Please enter 10 digits (${digits.length}/10 entered).`;
  }
  if (digits.length > 10) {
    return 'Mobile number cannot exceed 10 digits.';
  }
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.';
  }
  return null;
};

/**
 * Validates full name
 */
export const validateName = (name: string): string | null => {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Full name is required.';
  }
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters.';
  }
  if (trimmed.length > 100) {
    return 'Name is too long (maximum 100 characters).';
  }
  return null;
};

/**
 * Validates email address
 */
export const validateEmail = (email: string): string | null => {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Email address is required.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address.';
  }
  return null;
};

/**
 * Validates required text / select field
 */
export const validateRequired = (value: string, fieldLabel: string): string | null => {
  if (!value || !value.trim()) {
    return `${fieldLabel} is required.`;
  }
  return null;
};
