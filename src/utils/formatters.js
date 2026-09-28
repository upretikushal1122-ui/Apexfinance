export const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
  return `Rs. ${formatted}`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const formatMonthYear = (monthKey) => {
  // monthKey format: YYYY-MM
  if (!monthKey) return '';
  const [year, month] = monthKey.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const getMonthKey = (dateString) => {
  if (!dateString) return '';
  return dateString.substring(0, 7); // YYYY-MM
};
