export const CATEGORIES = [
  { id: 'salary', name: 'Salary & Income', type: 'income', color: '#059669', icon: 'Wallet' },
  { id: 'freelance', name: 'Freelance & Business', type: 'income', color: '#0284C7', icon: 'Briefcase' },
  { id: 'investments', name: 'Investments & Dividends', type: 'income', color: '#7C3AED', icon: 'TrendingUp' },
  { id: 'gifts', name: 'Gifts & Bonus', type: 'income', color: '#DB2777', icon: 'Gift' },
  { id: 'housing', name: 'Housing & Rent', type: 'expense', color: '#DC2626', icon: 'Home' },
  { id: 'food', name: 'Food & Dining', type: 'expense', color: '#EA580C', icon: 'Utensils' },
  { id: 'shopping', name: 'Shopping & Clothes', type: 'expense', color: '#9333EA', icon: 'ShoppingBag' },
  { id: 'utilities', name: 'Utilities & Bills', type: 'expense', color: '#CA8A04', icon: 'Zap' },
  { id: 'transport', name: 'Transportation & Fuel', type: 'expense', color: '#2563EB', icon: 'Car' },
  { id: 'entertainment', name: 'Entertainment & Leisure', type: 'expense', color: '#0891B2', icon: 'Tv' },
  { id: 'health', name: 'Healthcare & Fitness', type: 'expense', color: '#0D9488', icon: 'Activity' },
  { id: 'education', name: 'Education & Books', type: 'expense', color: '#4F46E5', icon: 'BookOpen' },
  { id: 'other', name: 'Other / Miscellaneous', type: 'expense', color: '#4B5563', icon: 'Tag' },
];

const DYNAMIC_PALETTE = [
  '#2563EB', '#059669', '#DC2626', '#EA580C', '#9333EA',
  '#0891B2', '#CA8A04', '#DB2777', '#7C3AED', '#0D9488',
  '#4F46E5', '#0284C7', '#65A30D', '#C026D3', '#D97706'
];

export const getCategoryMeta = (categoryId) => {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  return cat || { id: 'other', name: 'Other', type: 'expense', color: '#4B5563', icon: 'Tag' };
};

export const getUniqueCategoryColor = (categoryId, index = 0) => {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  if (cat && cat.color) return cat.color;
  return DYNAMIC_PALETTE[index % DYNAMIC_PALETTE.length];
};
