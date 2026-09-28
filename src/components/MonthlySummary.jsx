import React, { useMemo, useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { formatCurrency, formatMonthYear, getMonthKey } from '../utils/formatters';

export const MonthlySummary = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState('all');

  const monthlyData = useMemo(() => {
    const groups = {};

    transactions.forEach((tx) => {
      const monthKey = getMonthKey(tx.date);
      if (!monthKey) return;

      if (!groups[monthKey]) {
        groups[monthKey] = {
          monthKey,
          income: 0,
          expense: 0,
          count: 0,
          categories: {},
        };
      }

      const amt = Number(tx.amount) || 0;
      groups[monthKey].count += 1;
      if (tx.type === 'income') {
        groups[monthKey].income += amt;
      } else {
        groups[monthKey].expense += amt;
        groups[monthKey].categories[tx.category] = (groups[monthKey].categories[tx.category] || 0) + amt;
      }
    });

    return Object.keys(groups)
      .sort((a, b) => b.localeCompare(a))
      .map((key) => {
        const item = groups[key];
        const net = item.income - item.expense;
        const savingsRate = item.income > 0 ? Math.max(0, Math.round((net / item.income) * 100)) : 0;
        return {
          ...item,
          net,
          savingsRate,
        };
      });
  }, [transactions]);

  const displayMonths = useMemo(() => {
    if (selectedMonth === 'all') return monthlyData;
    return monthlyData.filter((m) => m.monthKey === selectedMonth);
  }, [monthlyData, selectedMonth]);

  return (
    <div className="card animate-fade-in" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2A2416', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} color="#2563EB" />
            Monthly Financial Summary
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#5C523D', marginTop: '0.2rem' }}>
            Historical income, expenses, and savings rates grouped by month
          </p>
        </div>

        {monthlyData.length > 0 && (
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-select"
            style={{ width: 'auto', minWidth: '160px' }}
          >
            <option value="all">All Recorded Months</option>
            {monthlyData.map((m) => (
              <option key={m.monthKey} value={m.monthKey}>
                {formatMonthYear(m.monthKey)}
              </option>
            ))}
          </select>
        )}
      </div>

      {monthlyData.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#807357' }}>
          No monthly data available yet. Add transactions with dates to see historical summaries.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {displayMonths.map((m) => (
            <div
              key={m.monthKey}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#2A2416' }}>
                    {formatMonthYear(m.monthKey)}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: '#5C523D' }}>
                    {m.count} transaction{m.count === 1 ? '' : 's'} logged
                  </span>
                </div>

                <div className="badge badge-income" style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}>
                  <PiggyBank size={14} /> Savings Rate: {m.savingsRate}%
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#EAE0BA', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#5C523D', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                    <TrendingUp size={12} color="#059669" /> Income
                  </span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669', marginTop: '0.2rem' }}>
                    {formatCurrency(m.income)}
                  </div>
                </div>

                <div style={{ background: '#EAE0BA', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#5C523D', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                    <TrendingDown size={12} color="#DC2626" /> Expenses
                  </span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#DC2626', marginTop: '0.2rem' }}>
                    {formatCurrency(m.expense)}
                  </div>
                </div>

                <div style={{ background: '#EAE0BA', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#5C523D', fontWeight: 600 }}>
                    Net Result
                  </span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: m.net >= 0 ? '#059669' : '#DC2626', marginTop: '0.2rem' }}>
                    {m.net >= 0 ? '+' : ''}{formatCurrency(m.net)}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#5C523D', marginBottom: '0.25rem' }}>
                  <span>Income Retention</span>
                  <span>{m.savingsRate}% Retained</span>
                </div>
                <div style={{ height: '8px', width: '100%', background: '#E0D4AA', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${m.savingsRate}%`,
                    background: '#059669',
                    borderRadius: '999px',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
