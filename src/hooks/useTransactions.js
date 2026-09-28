import { useState, useEffect, useMemo } from 'react';
import { INITIAL_TRANSACTIONS, INITIAL_UPCOMING_NOTES } from '../utils/initialData';

const LOCAL_STORAGE_KEY = 'finance_tracker_transactions_v1';
const BUDGET_LIMIT_KEY = 'finance_tracker_budget_limit_v1';
const UPCOMING_NOTES_KEY = 'finance_tracker_upcoming_notes_v1';
const DEFAULT_BUDGET_LIMIT = 3000;

export const useTransactions = () => {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse localStorage transactions', e);
    }
    return INITIAL_TRANSACTIONS;
  });

  const [upcomingNotes, setUpcomingNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(UPCOMING_NOTES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse upcoming notes from localStorage', e);
    }
    return INITIAL_UPCOMING_NOTES;
  });

  const [budgetLimit, setBudgetLimit] = useState(() => {
    try {
      const saved = localStorage.getItem(BUDGET_LIMIT_KEY);
      if (saved) {
        const parsed = Number(saved);
        if (!isNaN(parsed) && parsed >= 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse budget limit from localStorage', e);
    }
    return DEFAULT_BUDGET_LIMIT;
  });

  // Filter & Sort State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  // Persist transactions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to save transactions to localStorage', e);
    }
  }, [transactions]);

  // Persist upcoming notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(UPCOMING_NOTES_KEY, JSON.stringify(upcomingNotes));
    } catch (e) {
      console.error('Failed to save upcoming notes to localStorage', e);
    }
  }, [upcomingNotes]);

  // Persist budget limit to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BUDGET_LIMIT_KEY, budgetLimit.toString());
    } catch (e) {
      console.error('Failed to save budget limit to localStorage', e);
    }
  }, [budgetLimit]);

  // Action handlers
  const addTransaction = (newTx) => {
    const formatted = {
      ...newTx,
      id: 'tx-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      amount: parseFloat(newTx.amount),
    };
    setTransactions((prev) => [formatted, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  // Upcoming Note Handlers
  const addUpcomingNote = (noteData) => {
    const newNote = {
      ...noteData,
      id: 'note-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      amount: parseFloat(noteData.amount),
      status: 'pending',
    };
    setUpcomingNotes((prev) => [newNote, ...prev]);
  };

  const completeUpcomingNote = (id) => {
    const targetNote = upcomingNotes.find((n) => n.id === id);
    if (!targetNote) return;

    // Auto post to transactions log
    addTransaction({
      description: targetNote.title,
      amount: targetNote.amount,
      type: targetNote.type === 'receivable' ? 'income' : 'expense',
      category: targetNote.category || 'other',
      date: targetNote.dueDate || new Date().toISOString().substring(0, 10),
    });

    // Mark as completed
    setUpcomingNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 'completed' } : n))
    );
  };

  const cancelUpcomingNote = (id) => {
    setUpcomingNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 'cancelled' } : n))
    );
  };

  const deleteUpcomingNote = (id) => {
    setUpcomingNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const resetDemoData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setUpcomingNotes(INITIAL_UPCOMING_NOTES);
    setBudgetLimit(DEFAULT_BUDGET_LIMIT);
  };

  const updateBudgetLimit = (newLimit) => {
    const parsed = parseFloat(newLimit);
    if (!isNaN(parsed) && parsed >= 0) {
      setBudgetLimit(parsed);
    }
  };

  // Calculations
  const stats = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((tx) => {
      const amt = Number(tx.amount) || 0;
      if (tx.type === 'income') {
        totalIncome += amt;
      } else {
        totalExpense += amt;
      }
    });

    const netBalance = totalIncome - totalExpense;
    const isOverBudget = totalExpense > budgetLimit;
    const budgetUsagePercent = budgetLimit > 0 ? Math.min(Math.round((totalExpense / budgetLimit) * 100), 100) : 0;

    return {
      totalIncome,
      totalExpense,
      netBalance,
      budgetLimit,
      isOverBudget,
      budgetUsagePercent,
      transactionCount: transactions.length,
    };
  }, [transactions, budgetLimit]);

  // Filtered and Sorted list
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        if (selectedType !== 'all' && tx.type !== selectedType) return false;
        if (selectedCategory !== 'all' && tx.category !== selectedCategory) return false;
        if (searchTerm.trim() !== '') {
          const term = searchTerm.toLowerCase();
          const matchDesc = tx.description.toLowerCase().includes(term);
          const matchAmt = tx.amount.toString().includes(term);
          const matchCat = tx.category.toLowerCase().includes(term);
          if (!matchDesc && !matchAmt && !matchCat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'amount-desc') return b.amount - a.amount;
        if (sortBy === 'amount-asc') return a.amount - b.amount;
        return 0;
      });
  }, [transactions, selectedType, selectedCategory, searchTerm, sortBy]);

  return {
    transactions,
    filteredTransactions,
    upcomingNotes,
    stats,
    budgetLimit,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    sortBy,
    setSortBy,
    addTransaction,
    deleteTransaction,
    addUpcomingNote,
    completeUpcomingNote,
    cancelUpcomingNote,
    deleteUpcomingNote,
    resetDemoData,
    updateBudgetLimit,
  };
};
