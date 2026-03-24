import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button',
  fullWidth = false,
  icon = null
}) {
  
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto'
  };

  const sizes = {
    sm: { padding: '0.5rem 0.75rem', fontSize: '0.875rem' },
    md: { padding: '0.5rem 1rem', fontSize: '1rem' },
    lg: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' }
  };

  const variants = {
    primary: { backgroundColor: 'var(--primary)', color: '#fff', border: '1px solid var(--primary)', hoverBg: 'var(--primary-hover)' },
    secondary: { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-main)', border: '1px solid var(--border-color)', hoverBg: 'rgba(255,255,255,0.05)' },
    danger: { backgroundColor: 'var(--danger)', color: '#fff', border: '1px solid var(--danger)', hoverBg: 'var(--danger-hover)' },
    ghost: { backgroundColor: 'transparent', color: 'var(--text-muted)', border: '1px solid transparent', hoverBg: 'rgba(255,255,255,0.05)' }
  };

  const currentSize = sizes[size] || sizes.md;
  const currentVariant = variants[variant] || variants.primary;

  // React inline style hover needs state, but for a simple button we can just use normal CSS classes.
  // Since we don't have Tailwind, let's keep it simple with a styled wrapper or just rely on global classes if needed.
  // We'll write a simple global class in index.css for these.

  const buttonClass = `btn btn-${variant} btn-${size} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <button 
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyles, ...currentSize, ...currentVariant
      }}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
