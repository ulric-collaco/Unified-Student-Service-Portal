import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  // Dummy unread count
  const unreadCount = 2; 

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="h-16 border-b border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.8)] backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20">
          U
        </div>
        <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 hidden sm:block">
          Student Portal
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/notifications" className="relative p-2 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors text-slate-300 hover:text-white">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold text-white border-2 border-slate-900">
              {unreadCount}
            </span>
          )}
        </Link>
        
        <div className="h-8 w-[1px] bg-[rgba(255,255,255,0.1)] mx-2"></div>
        
        <Link to="/profile" className="flex items-center gap-2 hover:bg-[rgba(255,255,255,0.05)] p-1 pr-3 rounded-full transition-colors">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold border border-indigo-400/30">
            AS
          </div>
          <span className="text-sm font-medium hidden md:block text-slate-200">Aarav Singh</span>
        </Link>
      </div>
    </header>
  );
}
