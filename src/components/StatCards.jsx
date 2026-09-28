import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Target, AlertTriangle, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const StatCards = ({ stats }) => {
  const { totalIncome, totalExpense, netBalance, budgetLimit, isOverBudget, budgetUsagePercent } = stats;
  const isNearLimit = !isOverBudget && budgetUsagePercent >= 75;

  return (
    <div className="grid-stats">
      {/* Running Balance */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#5C523D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Running Balance
            </span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.25rem', color: netBalance >= 0 ? '#2A2416' : '#DC2626' }}>
              {formatCurrency(netBalance)}
            </div>
            <span style={{ fontSize: '0.78rem', color: netBalance >= 0 ? '#059669' : '#DC2626', fontWeight: 600, marginTop: '0.35rem', display: 'inline-block' }}>
              {netBalance >= 0 ? 'Positive Surplus' : 'Deficit Warning'}
            </span>
          </div>
          <div style={{
            background: 'var(--bg-card-darker)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '0.65rem',
            color: '#2563EB'
          }}>
            <Wallet size={22} />
          </div>
        </div>
      </div>

      {/* Total Income (GREEN) */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#5C523D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Income
            </span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.25rem', color: '#059669' }}>
              {formatCurrency(totalIncome)}
            </div>
            <span style={{ fontSize: '0.78rem', color: '#807357', fontWeight: 500, marginTop: '0.35rem', display: 'inline-block' }}>
              Total inflows logged
            </span>
          </div>
          <div style={{
            background: 'var(--income-bg)',
            border: '1px solid var(--income-border)',
            borderRadius: '12px',
            padding: '0.65rem',
            color: '#059669'
          }}>
            <TrendingUp size={22} />
          </div>
        </div>
      </div>

      {/* Total Expenses (RED) */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#5C523D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Expenses
            </span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '0.25rem', color: '#DC2626' }}>
              {formatCurrency(totalExpense)}
            </div>
            <span style={{ fontSize: '0.78rem', color: '#807357', fontWeight: 500, marginTop: '0.35rem', display: 'inline-block' }}>
              Total outflows logged
            </span>
          </div>
          <div style={{
            background: 'var(--expense-bg)',
            border: '1px solid var(--expense-border)',
            borderRadius: '12px',
            padding: '0.65rem',
            color: '#DC2626'
          }}>
            <TrendingDown size={22} />
          </div>
        </div>
      </div>

      {/* Budget Limit Status (YELLOW when near limit, RED when exceeded) */}
      <div className="card" style={{
        borderColor: isOverBudget ? 'var(--warning-red-border)' : isNearLimit ? 'var(--limit-yellow-border)' : 'var(--border-color)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#5C523D', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Monthly Budget
            </span>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              marginTop: '0.25rem',
              color: isOverBudget ? '#DC2626' : isNearLimit ? '#D97706' : '#2A2416'
            }}>
              {formatCurrency(budgetLimit)}
            </div>
            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                flex: 1,
                height: '6px',
                background: 'var(--bg-input)',
                borderRadius: '999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${budgetUsagePercent}%`,
                  background: isOverBudget ? '#DC2626' : isNearLimit ? '#D97706' : '#2563EB',
                  borderRadius: '999px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: isOverBudget ? '#DC2626' : isNearLimit ? '#D97706' : '#5C523D'
              }}>
                {budgetUsagePercent}%
              </span>
            </div>
          </div>
          <div style={{
            background: isOverBudget ? 'var(--warning-red-bg)' : isNearLimit ? 'var(--limit-yellow-bg)' : 'var(--bg-card-darker)',
            border: isOverBudget ? '1px solid var(--warning-red-border)' : isNearLimit ? '1px solid var(--limit-yellow-border)' : '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '0.65rem',
            color: isOverBudget ? '#DC2626' : isNearLimit ? '#D97706' : '#2563EB'
          }}>
            {isOverBudget ? <AlertTriangle size={22} /> : isNearLimit ? <AlertCircle size={22} /> : <Target size={22} />}
          </div>
        </div>
      </div>
    </div>
  );
};
