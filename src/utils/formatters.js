/**
 * Format number as currency
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 */
export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amount);
};

/**
 * Format number with commas
 * @param {number} number
 * @returns {string}
 */
export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

/**
 * Format date to readable string
 * @param {string|Date} date
 * @param {string} format
 * @returns {string}
 */
export const formatDate = (date, formatStr = "MMM dd, yyyy") => {
  if (!date) return "";

  const d = new Date(date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  return `${month} ${day}, ${year}`;
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date
 * @returns {string}
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return formatDate(date);
};

/**
 * Truncate text with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export function formatTitle(title, wordSeparator = " ") {
  if (!(typeof title).match("string")) {
    throw new Error("Formatted Title data type must be string");
  }

  /* ******** */

  const updatedTitle = title
    .toLowerCase()
    .split(wordSeparator)
    .map((word) => `${word[0].toUpperCase() + word.substring(1)}`)
    .join(wordSeparator);

  console.log(updatedTitle);

  return updatedTitle;
}
console.log(formatTitle("asd"));
