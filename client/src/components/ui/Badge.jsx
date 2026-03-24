import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const variants = {
    default: { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' },
    primary: { backgroundColor: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary)', border: '1px solid rgba(59, 130, 246, 0.4)' },
    success: { backgroundColor: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.4)' },
    danger: { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.4)' },
    warning: { backgroundColor: 'rgba(245, 158, 11, 0.2)', color: 'var(--warning)', border: '1px solid rgba(245, 158, 11, 0.4)' },
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <span style={{ ...baseStyles, ...currentVariant }} className={className}>
      {children}
    </span>
  );
}
