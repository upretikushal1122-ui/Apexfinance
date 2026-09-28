import React from 'react';
import { Inbox, PlusCircle, RotateCcw } from 'lucide-react';

export const EmptyState = ({ isFiltered, onResetFilters, onOpenAdd }) => {
  return (
    <div
      className="card"
      style={{
        textAlign: 'center',
        padding: '3rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}
    >
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'rgba(99, 102, 241, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#818cf8',
        marginBottom: '0.25rem'
      }}>
        <Inbox size={32} />
      </div>

      <div>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
          {isFiltered ? 'No Matching Transactions' : 'No Transactions Recorded Yet'}
        </h4>
        <p style={{ fontSize: '0.88rem', color: '#94a3b8', maxWidth: '360px', margin: '0.35rem auto 0 auto' }}>
          {isFiltered
            ? 'Try adjusting your search query, category, or type filters.'
            : 'Start tracking your financial progress by adding your first income or expense.'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        {isFiltered ? (
          <button onClick={onResetFilters} className="btn btn-secondary">
            <RotateCcw size={16} /> Reset Filters
          </button>
        ) : (
          <button onClick={onOpenAdd} className="btn btn-primary">
            <PlusCircle size={16} /> Add First Transaction
          </button>
        )}
      </div>
    </div>
  );
};
