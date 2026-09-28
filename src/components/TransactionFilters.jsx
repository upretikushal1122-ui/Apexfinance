import React from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIES } from '../utils/categories';

export const TransactionFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
  sortBy,
  setSortBy,
  onResetFilters,
  totalCount,
  filteredCount,
}) => {
  const isFiltered = searchTerm !== '' || selectedCategory !== 'all' || selectedType !== 'all' || sortBy !== 'date-desc';

  return (
    <div className="card" style={{ marginBottom: '1.25rem', padding: '1rem 1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', alignItems: 'center' }}>
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <Search size={16} color="#807357" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.4rem' }}
          />
        </div>

        {/* Category Selector */}
        <div style={{ position: 'relative' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter Pill */}
        <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <button
            type="button"
            onClick={() => setSelectedType('all')}
            style={{
              flex: 1,
              padding: '0.45rem',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: selectedType === 'all' ? '#EAE0BA' : 'transparent',
              color: selectedType === 'all' ? '#2A2416' : '#5C523D'
            }}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('income')}
            style={{
              flex: 1,
              padding: '0.45rem',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: selectedType === 'income' ? 'var(--income-bg)' : 'transparent',
              color: selectedType === 'income' ? 'var(--income)' : '#5C523D'
            }}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setSelectedType('expense')}
            style={{
              flex: 1,
              padding: '0.45rem',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: selectedType === 'expense' ? 'var(--expense-bg)' : 'transparent',
              color: selectedType === 'expense' ? 'var(--expense)' : '#5C523D'
            }}
          >
            Expense
          </button>
        </div>

        {/* Sort Dropdown */}
        <div style={{ position: 'relative' }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {isFiltered && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.85rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.82rem',
          color: '#5C523D'
        }}>
          <span>
            Showing <strong style={{ color: '#2A2416' }}>{filteredCount}</strong> of <strong style={{ color: '#2A2416' }}>{totalCount}</strong> entries
          </span>
          <button
            onClick={onResetFilters}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
          >
            <X size={12} /> Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
