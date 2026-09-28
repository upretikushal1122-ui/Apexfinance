import React, { useState } from 'react';
import { CalendarClock, Plus, CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CATEGORIES } from '../utils/categories';

export const UpcomingNotes = ({
  upcomingNotes,
  onAddNote,
  onCompleteNote,
  onCancelNote,
  onDeleteNote,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('receivable'); // 'receivable' | 'payable'
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('other');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please provide a title for the note.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (!dueDate) {
      setError('Please select a due date.');
      return;
    }

    onAddNote({
      title: title.trim(),
      amount: numAmount,
      type,
      category,
      dueDate,
    });

    setTitle('');
    setAmount('');
    setError('');
    setShowAddForm(false);
  };

  return (
    <div className="card animate-fade-in" style={{ marginTop: '1.25rem', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2A2416', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CalendarClock size={18} color="#2563EB" />
            Upcoming Payables & Receivables
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#5C523D', marginTop: '0.15rem' }}>
            Track scheduled payments, subscriptions & interest deposits
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.78rem', color: '#2A2416', fontWeight: 700 }}
        >
          <Plus size={14} /> {showAddForm ? 'Close' : 'Add Note'}
        </button>
      </div>

      {/* Add Note Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--bg-input)', padding: '1.15rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2A2416' }}>Create Note</span>
            <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', padding: '2px', borderRadius: 'var(--radius-sm)' }}>
              <button
                type="button"
                onClick={() => setType('receivable')}
                style={{
                  padding: '0.25rem 0.55rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  background: type === 'receivable' ? '#059669' : 'transparent',
                  color: type === 'receivable' ? '#ffffff' : '#2A2416'
                }}
              >
                Receivable
              </button>
              <button
                type="button"
                onClick={() => setType('payable')}
                style={{
                  padding: '0.25rem 0.55rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  background: type === 'payable' ? '#DC2626' : 'transparent',
                  color: type === 'payable' ? '#ffffff' : '#2A2416'
                }}
              >
                Payable
              </button>
            </div>
          </div>

          {error && <p style={{ color: '#DC2626', fontSize: '0.78rem', marginBottom: '0.65rem' }}>{error}</p>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              type="text"
              placeholder="Note title (e.g. FD Interest, Netflix Bill)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              <input
                type="number"
                step="0.01"
                placeholder="Amount (Rs.)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input"
                required
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button type="submit" className="btn btn-blue-add btn-sm" style={{ width: '100%', marginTop: '0.25rem' }}>
              Save Upcoming Note
            </button>
          </div>
        </form>
      )}

      {/* List of Upcoming Notes */}
      {upcomingNotes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '1.25rem 0.5rem', color: '#807357', fontSize: '0.85rem' }}>
          No upcoming notes recorded. Click "+ Add Note" to track scheduled payments or interest receivables.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {upcomingNotes.map((note) => {
            const isReceivable = note.type === 'receivable';
            const isPending = note.status === 'pending';
            const isCompleted = note.status === 'completed';
            const isCancelled = note.status === 'cancelled';

            return (
              <div
                key={note.id}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  opacity: isCancelled ? 0.6 : 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2A2416', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {isReceivable ? <ArrowUpRight size={14} color="#059669" /> : <ArrowDownRight size={14} color="#DC2626" />}
                      {note.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#5C523D', marginTop: '0.15rem' }}>
                      Due: {formatDate(note.dueDate)} • <span style={{ textTransform: 'capitalize' }}>{note.type}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: isReceivable ? '#059669' : '#DC2626' }}>
                      {formatCurrency(note.amount)}
                    </div>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '0.1rem 0.45rem',
                        borderRadius: '999px',
                        display: 'inline-block',
                        marginTop: '0.15rem',
                        background: isCompleted ? 'rgba(5, 150, 105, 0.15)' : isCancelled ? 'rgba(220, 38, 38, 0.15)' : 'rgba(37, 99, 235, 0.15)',
                        color: isCompleted ? '#059669' : isCancelled ? '#DC2626' : '#2563EB'
                      }}
                    >
                      {note.status}
                    </span>
                  </div>
                </div>

                {/* COMPLETED / CANCELLED Action Buttons for Pending Items */}
                {isPending && (
                  <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.35rem', borderTop: '1px solid var(--border-color)' }}>
                    <button
                      onClick={() => onCompleteNote(note.id)}
                      className="btn btn-sm"
                      style={{
                        flex: 1,
                        background: '#059669',
                        color: '#000000',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        padding: '0.35rem'
                      }}
                      title="Mark as completed & record transaction"
                    >
                      <CheckCircle2 size={14} /> Completed
                    </button>
                    <button
                      onClick={() => onCancelNote(note.id)}
                      className="btn btn-sm"
                      style={{
                        flex: 1,
                        background: '#DC2626',
                        color: '#000000',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        padding: '0.35rem'
                      }}
                      title="Mark as cancelled"
                    >
                      <XCircle size={14} /> Cancelled
                    </button>
                  </div>
                )}

                {!isPending && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.2rem' }}>
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      style={{ background: 'none', border: 'none', color: '#807357', cursor: 'pointer', padding: '0.2rem' }}
                      title="Remove note"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
