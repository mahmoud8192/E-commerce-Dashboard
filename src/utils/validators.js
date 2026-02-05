/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password
 * @returns {Object} { isValid, message }
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters"
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter"
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter"
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one number"
    };
  }

  return { isValid: true, message: "Password is strong" };
};

/**
 * Validate required field
 * @param {any} value
 * @param {string} fieldName
 * @returns {string|null}
 */
export const validateRequired = (value, fieldName = "This field") => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validate number range
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {string|null}
 */
export const validateNumberRange = (value, min, max) => {
  const num = Number(value);

  if (isNaN(num)) {
    return "Must be a valid number";
  }

  if (min !== undefined && num < min) {
    return `Must be at least ${min}`;
  }

  if (max !== undefined && num > max) {
    return `Must be at most ${max}`;
  }

  return null;
};
