import React from 'react';
import { LayoutDashboard, PieChart, Calendar, Target } from 'lucide-react';

export const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard & Log', icon: LayoutDashboard },
    { id: 'analytics', label: 'Spending Analytics', icon: PieChart },
    { id: 'monthly', label: 'Monthly Summary', icon: Calendar },
    { id: 'budget', label: 'Budget Limit', icon: Target },
  ];

  return (
    <nav style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.88rem',
              border: isActive ? '1px solid #D5C799' : '1px solid var(--border-color)',
              background: isActive ? '#EAE0BA' : 'var(--bg-card)',
              color: isActive ? '#2A2416' : '#5C523D',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <Icon size={18} color={isActive ? '#2563EB' : '#807357'} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
