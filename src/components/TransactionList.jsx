import React from 'react';
import { TransactionItem } from './TransactionItem';
import { EmptyState } from './EmptyState';
import { ListFilter } from 'lucide-react';

export const TransactionList = ({
  transactions,
  onDeleteTransaction,
  isFiltered,
  onResetFilters,
  onOpenAddModal
}) => {
  if (transactions.length === 0) {
    return (
      <EmptyState
        isFiltered={isFiltered}
        onResetFilters={onResetFilters}
        onOpenAdd={onOpenAddModal}
      />
    );
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        marginBottom: '0.85rem',
        padding: '0 0.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
          <ListFilter size={16} color="#6366f1" />
          <span>Recent Transactions ({transactions.length})</span>
        </div>
      </div>

      <div>
        {transactions.map((tx) => (
          <TransactionItem
            key={tx.id}
            transaction={tx}
            onDelete={onDeleteTransaction}
          />
        ))}
      </div>
    </div>
  );
};
