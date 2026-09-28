import React, { useState } from 'react';
import { Target, AlertTriangle, AlertCircle, CheckCircle2, ShieldAlert, Edit2, Save } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const BudgetLimit = ({ stats, onUpdateBudget }) => {
  const { totalExpense, budgetLimit, isOverBudget, budgetUsagePercent } = stats;
  const isNearLimit = !isOverBudget && budgetUsagePercent >= 75;

  const [isEditing, setIsEditing] = useState(false);
  const [inputLimit, setInputLimit] = useState(budgetLimit.toString());
  const [error, setError] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setError('');

    const parsed = parseFloat(inputLimit);
    if (isNaN(parsed) || parsed < 0) {
      setError('Please enter a valid non-negative budget limit.');
      return;
    }

    onUpdateBudget(parsed);
    setIsEditing(false);
  };

  const remaining = budgetLimit - totalExpense;

  return (
    <div className="card animate-fade-in" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2A2416', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={20} color="#2563EB" />
          Budget Limit & Control
        </h3>
        {!isEditing && (
          <button
            onClick={() => {
              setInputLimit(budgetLimit.toString());
              setIsEditing(true);
            }}
            className="btn btn-secondary btn-sm"
          >
            <Edit2 size={14} /> Adjust Limit
          </button>
        )}
      </div>

      {/* RED Warning: Exceeded Limit */}
      {isOverBudget && (
        <div
          className="badge-warning-red animate-fade-in"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}
        >
          <AlertTriangle size={24} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
          <div>
            <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.15rem' }}>
              Warning: Budget Limit Exceeded!
            </strong>
            Your total logged expenses ({formatCurrency(totalExpense)}) have passed your set threshold of {formatCurrency(budgetLimit)} by {formatCurrency(Math.abs(remaining))}. Consider trimming non-essential outflows.
          </div>
        </div>
      )}

      {/* YELLOW Warning: Close to Limit */}
      {isNearLimit && (
        <div
          className="badge-limit-yellow animate-fade-in"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}
        >
          <AlertCircle size={24} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
          <div>
            <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.15rem' }}>
              Notice: Nearing Budget Limit ({budgetUsagePercent}%)
            </strong>
            You are close to your monthly spending limit. You have {formatCurrency(remaining)} remaining out of {formatCurrency(budgetLimit)}.
          </div>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSave} style={{ background: 'var(--bg-input)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label">Set Monthly Expense Budget (Rs.)</label>
            <input
              type="number"
              step="50"
              min="0"
              value={inputLimit}
              onChange={(e) => setInputLimit(e.target.value)}
              className="form-input"
              style={{ fontSize: '1.1rem', fontWeight: 700 }}
              required
            />
          </div>
          {error && <p style={{ color: '#DC2626', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{error}</p>}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {/* BLUE FOR SAVE ACTION */}
            <button type="submit" className="btn btn-blue-add btn-sm">
              <Save size={14} /> Save New Limit
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: '#5C523D', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                Budget Utilization
              </span>
              <div style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: isOverBudget ? '#DC2626' : isNearLimit ? '#D97706' : '#2A2416',
                marginTop: '0.2rem'
              }}>
                {budgetUsagePercent}% <span style={{ fontSize: '0.85rem', color: '#5C523D', fontWeight: 500 }}>of target used</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.78rem', color: '#5C523D', fontWeight: 600 }}>
                Remaining Allowance
              </span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: remaining >= 0 ? '#059669' : '#DC2626', marginTop: '0.2rem' }}>
                {remaining >= 0 ? formatCurrency(remaining) : `-${formatCurrency(Math.abs(remaining))}`}
              </div>
            </div>
          </div>

          <div style={{ height: '12px', width: '100%', background: '#E0D4AA', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${budgetUsagePercent}%`,
              background: isOverBudget
                ? '#DC2626'
                : isNearLimit
                ? '#D97706'
                : '#2563EB',
              borderRadius: '999px',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
        <div style={{ background: 'var(--bg-input)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <CheckCircle2 size={18} color="#059669" />
          <div style={{ fontSize: '0.82rem' }}>
            <strong style={{ color: '#2A2416', display: 'block' }}>Target Limit</strong>
            <span style={{ color: '#5C523D' }}>{formatCurrency(budgetLimit)}</span>
          </div>
        </div>

        <div style={{ background: 'var(--bg-input)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isOverBudget ? <ShieldAlert size={18} color="#DC2626" /> : isNearLimit ? <AlertCircle size={18} color="#D97706" /> : <CheckCircle2 size={18} color="#059669" />}
          <div style={{ fontSize: '0.82rem' }}>
            <strong style={{ color: '#2A2416', display: 'block' }}>Status</strong>
            <span style={{ color: isOverBudget ? '#DC2626' : isNearLimit ? '#D97706' : '#059669' }}>
              {isOverBudget ? 'Exceeded Limit' : isNearLimit ? 'Near Limit (Warning)' : 'Within Healthy Range'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
