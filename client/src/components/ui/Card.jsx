import React from 'react';

export default function Card({ children, className = '', padding = 'p-6', hover = false, onClick }) {
  const baseStyle = 'glass rounded-xl overflow-hidden transition-all duration-300';
  const paddingStyle = padding ? padding : '';
  const hoverStyle = hover ? 'hover:shadow-lg hover:-translate-y-1 hover:border-[rgba(255,255,255,0.1)] cursor-pointer' : '';

  // Simple inline CSS class concatenation since we aren't using Tailwind
  const inlineStyles = {
    padding: padding === 'p-6' ? '1.5rem' : padding === 'p-4' ? '1rem' : padding === 'none' ? '0' : padding,
  };

  return (
    <div 
      className={`${baseStyle} ${hoverStyle} ${className}`} 
      style={inlineStyles}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
