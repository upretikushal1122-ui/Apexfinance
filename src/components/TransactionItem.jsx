import React, { useState } from 'react';
import {
  Wallet, Briefcase, TrendingUp, Gift, Home, Utensils,
  ShoppingBag, Zap, Car, Tv, Activity, BookOpen, Tag, Trash2, Check, X
} from 'lucide-react';
import { getCategoryMeta } from '../utils/categories';
import { formatCurrency, formatDate } from '../utils/formatters';

const ICON_MAP = {
  Wallet, Briefcase, TrendingUp, Gift, Home, Utensils,
  ShoppingBag, Zap, Car, Tv, Activity, BookOpen, Tag
};

export const TransactionItem = ({ transaction, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const meta = getCategoryMeta(transaction.category);
  const IconComponent = ICON_MAP[meta.icon] || Tag;

  const isIncome = transaction.type === 'income';

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.95rem 1.15rem',
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '0.6rem',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Category Icon & Details */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: isIncome ? 'var(--income-bg)' : 'var(--expense-bg)',
          border: isIncome ? '1px solid var(--income-border)' : '1px solid var(--expense-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isIncome ? '#059669' : '#DC2626',
          flexShrink: 0
        }}>
          <IconComponent size={19} />
        </div>

        <div>
          <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#2A2416' }}>
            {transaction.description}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.15rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#5C523D', fontWeight: 600 }}>
              {meta.name}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#807357' }}>•</span>
            <span style={{ fontSize: '0.75rem', color: '#807357' }}>
              {formatDate(transaction.date)}
            </span>
          </div>
        </div>
      </div>

      {/* Amount & Delete */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontWeight: 800,
            fontSize: '1rem',
            color: isIncome ? '#059669' : '#DC2626'
          }}>
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
          </div>
          <span className={`badge ${isIncome ? 'badge-income' : 'badge-expense'}`} style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>
            {transaction.type}
          </span>
        </div>

        {showConfirm ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <button
              onClick={() => onDelete(transaction.id)}
              className="btn btn-danger btn-sm"
              style={{ padding: '0.35rem 0.5rem' }}
              title="Confirm Delete"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.35rem 0.5rem' }}
              title="Cancel"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.45rem', color: '#807357' }}
            title="Delete entry"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
