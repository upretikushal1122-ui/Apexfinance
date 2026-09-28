import React, { useState } from 'react';
import { useTransactions } from './hooks/useTransactions';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { StatCards } from './components/StatCards';
import { TransactionForm } from './components/TransactionForm';
import { UpcomingNotes } from './components/UpcomingNotes';
import { TransactionFilters } from './components/TransactionFilters';
import { TransactionList } from './components/TransactionList';
import { CategoryChart } from './components/CategoryChart';
import { MonthlySummary } from './components/MonthlySummary';
import { BudgetLimit } from './components/BudgetLimit';
import { X } from 'lucide-react';

export function App() {
  const {
    transactions,
    filteredTransactions,
    upcomingNotes,
    stats,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    sortBy,
    setSortBy,
    addTransaction,
    deleteTransaction,
    addUpcomingNote,
    completeUpcomingNote,
    cancelUpcomingNote,
    deleteUpcomingNote,
    resetDemoData,
    updateBudgetLimit,
  } = useTransactions();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSortBy('date-desc');
  };

  const isFiltered = searchTerm !== '' || selectedCategory !== 'all' || selectedType !== 'all' || sortBy !== 'date-desc';

  return (
    <div className="app-container">
      {/* Header Bar */}
      <Header
        netBalance={stats.netBalance}
        isOverBudget={stats.isOverBudget}
        onResetDemo={resetDemoData}
        onOpenAddModal={() => setShowAddModal(true)}
      />

      {/* Navigation Tabs */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Top Stat Cards Grid */}
      <StatCards stats={stats} />

      {/* Main Tabbed Views */}
      <main>
        {activeTab === 'dashboard' && (
          <div className="dashboard-layout">
            {/* Left Column: Transaction Add Form & Upcoming Receivables/Payables Notes */}
            <div>
              <TransactionForm onAddTransaction={addTransaction} />
              <UpcomingNotes
                upcomingNotes={upcomingNotes}
                onAddNote={addUpcomingNote}
                onCompleteNote={completeUpcomingNote}
                onCancelNote={cancelUpcomingNote}
                onDeleteNote={deleteUpcomingNote}
              />
            </div>

            {/* Right Column: Filters & Transaction Log */}
            <div>
              <TransactionFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onResetFilters={resetFilters}
                totalCount={transactions.length}
                filteredCount={filteredTransactions.length}
              />

              <TransactionList
                transactions={filteredTransactions}
                onDeleteTransaction={deleteTransaction}
                isFiltered={isFiltered}
                onResetFilters={resetFilters}
                onOpenAddModal={() => setShowAddModal(true)}
              />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <CategoryChart transactions={transactions} />
          </div>
        )}

        {activeTab === 'monthly' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <MonthlySummary transactions={transactions} />
          </div>
        )}

        {activeTab === 'budget' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <BudgetLimit stats={stats} onUpdateBudget={updateBudgetLimit} />
          </div>
        )}
      </main>

      {/* Quick Add Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(42, 36, 22, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{ width: '100%', maxWidth: '440px', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(0, 0, 0, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                color: '#2A2416',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>
            <TransactionForm
              onAddTransaction={(tx) => {
                addTransaction(tx);
                setShowAddModal(false);
              }}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
