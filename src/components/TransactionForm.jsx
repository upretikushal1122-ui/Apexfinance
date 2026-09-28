import React, { useState } from 'react';
import { PlusCircle, ArrowUpRight, ArrowDownRight, Tag, DollarSign, Calendar as CalendarIcon, FileText } from 'lucide-react';
import { CATEGORIES } from '../utils/categories';

export const TransactionForm = ({ onAddTransaction, onClose }) => {
  const todayStr = new Date().toISOString().substring(0, 10);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // 'expense' | 'income'
  const [category, setCategory] = useState('food');
  const [date, setDate] = useState(todayStr);
  const [error, setError] = useState('');

  const availableCategories = CATEGORIES.filter((cat) => cat.type === type || cat.id === 'other');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) {
      setError('Please provide a description for the transaction.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than Rs. 0.00.');
      return;
    }

    if (!date) {
      setError('Please select a transaction date.');
      return;
    }

    onAddTransaction({
      description: description.trim(),
      amount: numAmount,
      type,
      category,
      date,
    });

    setDescription('');
    setAmount('');
    setError('');
    if (onClose) onClose();
  };

  return (
    <div className="card animate-fade-in" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2A2416' }}>
          Add New Transaction
        </h3>
        {/* Income / Expense Toggle Pill */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-input)',
          padding: '3px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <button
            type="button"
            onClick={() => {
              setType('expense');
              setCategory('food');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: type === 'expense' ? '#DC2626' : 'transparent',
              color: type === 'expense' ? '#ffffff' : '#5C523D',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowDownRight size={14} /> Expense
          </button>
          <button
            type="button"
            onClick={() => {
              setType('income');
              setCategory('salary');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              background: type === 'income' ? '#059669' : 'transparent',
              color: type === 'income' ? '#ffffff' : '#5C523D',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowUpRight size={14} /> Income
          </button>
        </div>
      </div>

      {error && (
        <div className="badge badge-warning-red" style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <DollarSign size={14} /> Amount (Rs.)
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-input"
            style={{ fontSize: '1.1rem', fontWeight: 700 }}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <FileText size={14} /> Description
          </label>
          <input
            type="text"
            placeholder="e.g. Grocery Store, Client Invoice, Rent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Tag size={14} /> Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              {availableCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CalendarIcon size={14} /> Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
              required
            />
          </div>
        </div>

        {/* BLUE FOR ADD ACTION */}
        <button
          type="submit"
          className="btn btn-blue-add"
          style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem' }}
        >
          <PlusCircle size={18} /> Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
};
