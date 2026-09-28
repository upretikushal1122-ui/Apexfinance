import React from 'react';
import { Wallet, RefreshCw, PlusCircle, ShieldAlert } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const Header = ({ netBalance, isOverBudget, onResetDemo, onOpenAddModal }) => {
  return (
    <header className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem 1.5rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            background: '#2563EB',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(37, 99, 235, 0.25)'
          }}>
            <Wallet size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#2A2416' }}>
              Apex<span style={{ color: '#2563EB' }}>Finance</span>
            </h1>
            <p style={{ fontSize: '0.82rem', color: '#5C523D' }}>
              Personal Income & Expense Tracker
            </p>
          </div>
        </div>

        {/* Quick Balance & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {isOverBudget && (
            <div className="badge badge-warning-red" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}>
              <ShieldAlert size={16} /> Budget Exceeded
            </div>
          )}

          <div style={{
            textAlign: 'right',
            paddingRight: '1rem',
            borderRight: '1px solid var(--border-color)'
          }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#5C523D', fontWeight: 600 }}>
              Net Balance
            </span>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              color: netBalance >= 0 ? '#059669' : '#DC2626'
            }}>
              {formatCurrency(netBalance)}
            </div>
          </div>

          <button
            onClick={onResetDemo}
            className="btn btn-secondary btn-sm"
            title="Reset to default sample data"
          >
            <RefreshCw size={14} /> Reset Demo
          </button>

          {/* Blue for Add Part */}
          <button
            onClick={onOpenAddModal}
            className="btn btn-blue-add btn-sm"
          >
            <PlusCircle size={16} /> Add Transaction
          </button>
        </div>
      </div>
    </header>
  );
};
