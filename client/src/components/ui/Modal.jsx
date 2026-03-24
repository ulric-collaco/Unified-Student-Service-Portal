import React from 'react';
import Card from './Card';
import Button from './Button';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        style={{ cursor: 'pointer' }}
      ></div>
      <Card className="relative z-10 w-full max-w-md animate-fade-up" padding="p-0">
        <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.1)]">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-[rgba(255,255,255,0.1)] rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </Card>
    </div>
  );
}
