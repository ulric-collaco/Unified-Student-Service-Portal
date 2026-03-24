import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Megaphone, Calendar, Bell, User } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/notices', label: 'Notices', icon: <Megaphone size={20} /> },
    { path: '/events', label: 'Events', icon: <Calendar size={20} /> },
    { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <aside className="w-64 border-r border-[rgba(255,255,255,0.1)] bg-[rgba(30,41,59,0.5)] hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16">
      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm
              ${isActive 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-[rgba(255,255,255,0.05)]'}`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-[rgba(255,255,255,0.1)] text-xs text-center text-slate-500">
        &copy; 2026 Unified Portal
      </div>
    </aside>
  );
}
