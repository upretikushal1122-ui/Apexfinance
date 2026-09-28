import React, { useState, useMemo } from 'react';
import { PieChart as PieIcon, BarChart3, TrendingDown, TrendingUp } from 'lucide-react';
import { getCategoryMeta, getUniqueCategoryColor } from '../utils/categories';
import { formatCurrency } from '../utils/formatters';

export const CategoryChart = ({ transactions }) => {
  const [chartType, setChartType] = useState('expense');
  const [viewMode, setViewMode] = useState('bar');

  const categoryBreakdown = useMemo(() => {
    const totals = {};
    let totalSum = 0;

    transactions.forEach((tx) => {
      if (tx.type === chartType) {
        const amt = Number(tx.amount) || 0;
        totals[tx.category] = (totals[tx.category] || 0) + amt;
        totalSum += amt;
      }
    });

    const items = Object.entries(totals)
      .map(([catId, amount], idx) => {
        const meta = getCategoryMeta(catId);
        const percentage = totalSum > 0 ? Math.round((amount / totalSum) * 100) : 0;
        return {
          catId,
          name: meta.name,
          color: getUniqueCategoryColor(catId, idx),
          amount,
          percentage,
          exactPercent: totalSum > 0 ? (amount / totalSum) * 100 : 0,
        };
      })
      .sort((a, b) => b.amount - a.amount);

    return { items, totalSum };
  }, [transactions, chartType]);

  const maxAmount = useMemo(() => {
    if (categoryBreakdown.items.length === 0) return 1;
    return Math.max(...categoryBreakdown.items.map((i) => i.amount));
  }, [categoryBreakdown]);

  const donutSlices = useMemo(() => {
    let cumulativePercent = 0;
    return categoryBreakdown.items.map((item) => {
      const startAngle = cumulativePercent * 3.6;
      cumulativePercent += item.exactPercent;
      const endAngle = cumulativePercent * 3.6;
      return {
        ...item,
        startAngle,
        endAngle,
      };
    });
  }, [categoryBreakdown]);

  return (
    <div className="card animate-fade-in" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2A2416', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PieIcon size={20} color="#2563EB" />
            Category Breakdown
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#5C523D', marginTop: '0.2rem' }}>
            Visualizing distinct category distributions of {chartType === 'expense' ? 'outflows' : 'inflows'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setChartType('expense')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: chartType === 'expense' ? 'var(--expense-bg)' : 'transparent',
                color: chartType === 'expense' ? '#DC2626' : '#2A2416'
              }}
            >
              <TrendingDown size={14} /> Expenses
            </button>
            <button
              onClick={() => setChartType('income')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: chartType === 'income' ? 'var(--income-bg)' : 'transparent',
                color: chartType === 'income' ? '#059669' : '#2A2416'
              }}
            >
              <TrendingUp size={14} /> Income
            </button>
          </div>

          <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setViewMode('bar')}
              style={{
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: viewMode === 'bar' ? '#EAE0BA' : 'transparent',
                color: '#2A2416'
              }}
              title="Bar View"
            >
              <BarChart3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('donut')}
              style={{
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: viewMode === 'donut' ? '#EAE0BA' : 'transparent',
                color: '#2A2416'
              }}
              title="Donut Chart View"
            >
              <PieIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {categoryBreakdown.items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#807357' }}>
          No {chartType} transactions found to generate category chart.
        </div>
      ) : (
        <>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            padding: '0.85rem 1.1rem',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '0.85rem', color: '#5C523D', fontWeight: 600 }}>
              Total Categorized {chartType === 'expense' ? 'Expenses' : 'Income'}
            </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: chartType === 'expense' ? '#DC2626' : '#059669' }}>
              {formatCurrency(categoryBreakdown.totalSum)}
            </span>
          </div>

          {viewMode === 'bar' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {categoryBreakdown.items.map((item) => {
                const relativeWidth = Math.max(Math.round((item.amount / maxAmount) * 100), 4);
                return (
                  <div key={item.catId} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                      <span style={{ fontWeight: 700, color: '#2A2416', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.color, display: 'inline-block' }} />
                        {item.name}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontWeight: 800, color: '#2A2416' }}>
                          {formatCurrency(item.amount)}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#5C523D', width: '36px', textAlign: 'right', fontWeight: 700 }}>
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                    <div style={{
                      height: '10px',
                      width: '100%',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '999px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${relativeWidth}%`,
                        background: item.color,
                        borderRadius: '999px',
                        transition: 'width 0.4s ease'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '1rem 0' }}>
              <div style={{ position: 'relative', width: '220px', height: '220px' }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  {donutSlices.map((slice, idx) => {
                    const strokeDasharray = `${slice.exactPercent} ${100 - slice.exactPercent}`;
                    let offset = 0;
                    for (let i = 0; i < idx; i++) {
                      offset += donutSlices[i].exactPercent;
                    }
                    const strokeDashoffset = -offset;

                    return (
                      <circle
                        key={slice.catId}
                        cx="50"
                        cy="50"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke={slice.color}
                        strokeWidth="8"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                      />
                    );
                  })}
                </svg>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#5C523D', fontWeight: 700 }}>
                    Categories
                  </span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2A2416' }}>
                    {categoryBreakdown.items.length}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, minWidth: '200px' }}>
                {categoryBreakdown.items.map((item) => (
                  <div key={item.catId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: item.color }} />
                      <span style={{ color: '#2A2416', fontWeight: 700 }}>{item.name}</span>
                    </div>
                    <span style={{ fontWeight: 800, color: '#2A2416' }}>
                      {item.percentage}% ({formatCurrency(item.amount)})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
