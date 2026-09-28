export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-1',
    description: 'Monthly Salary Payment',
    amount: 4500,
    type: 'income',
    category: 'salary',
    date: '2026-09-01',
  },
  {
    id: 'tx-2',
    description: 'Apartment Rent & Management',
    amount: 1450,
    type: 'expense',
    category: 'housing',
    date: '2026-09-02',
  },
  {
    id: 'tx-3',
    description: 'Whole Foods Market Grocery',
    amount: 245.80,
    type: 'expense',
    category: 'food',
    date: '2026-09-05',
  },
  {
    id: 'tx-4',
    description: 'Freelance Web Design Contract',
    amount: 1200,
    type: 'income',
    category: 'freelance',
    date: '2026-09-10',
  },
  {
    id: 'tx-5',
    description: 'Electricity & High-Speed Internet',
    amount: 185.50,
    type: 'expense',
    category: 'utilities',
    date: '2026-09-12',
  },
  {
    id: 'tx-6',
    description: 'Dinner with Team at Bistro',
    amount: 112.40,
    type: 'expense',
    category: 'food',
    date: '2026-09-15',
  },
  {
    id: 'tx-7',
    description: 'Gas Station Refill',
    amount: 58.00,
    type: 'expense',
    category: 'transport',
    date: '2026-09-18',
  },
  {
    id: 'tx-8',
    description: 'Stock Investment Dividend',
    amount: 320.00,
    type: 'income',
    category: 'investments',
    date: '2026-09-20',
  },
];

export const INITIAL_UPCOMING_NOTES = [
  {
    id: 'note-1',
    title: 'Interest on Fixed Deposit',
    amount: 750,
    type: 'receivable', // incoming
    category: 'investments',
    dueDate: '2026-09-28',
    status: 'pending', // 'pending' | 'completed' | 'cancelled'
  },
  {
    id: 'note-2',
    title: 'Cloud Hosting Subscription',
    amount: 140,
    type: 'payable', // outgoing
    category: 'utilities',
    dueDate: '2026-10-01',
    status: 'pending',
  },
];
