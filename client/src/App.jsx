import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Notices from './pages/Notices';
import Events from './pages/Events';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/events" element={<Events />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center h-full pt-20">
            <h1 className="text-4xl font-bold text-slate-600 mb-2">404</h1>
            <p className="text-slate-400">Page not found</p>
          </div>
        } />
      </Routes>
    </Layout>
  );
}
