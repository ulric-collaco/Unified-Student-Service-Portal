import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { FileText, Calendar, Bell, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState({ notices: [], events: [], profile: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticesRes, eventsRes, profileRes] = await Promise.all([
          api.getNotices(),
          api.getEvents(),
          api.getProfile()
        ]);
        
        setData({
          notices: noticesRes?.data?.slice(0, 3) || [],
          events: eventsRes?.data?.slice(0, 2) || [],
          profile: profileRes?.data || null
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex h-64 items-center justify-center text-slate-400">Loading dashboard...</div>;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Welcome back, {data.profile?.name?.split(' ')[0] || 'Student'}!
          </h1>
          <p className="text-slate-400 mt-1">Here's what's happening on campus today.</p>
        </div>
        <div className="text-right text-sm text-slate-400">
          <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>{data.profile?.branch} • {data.profile?.year}</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <FileText size={24} className="text-blue-400" />, label: 'New Notices', value: '3', color: 'from-blue-600/20 to-transparent border-blue-500/20' },
          { icon: <Calendar size={24} className="text-emerald-400" />, label: 'Upcoming Events', value: '5', color: 'from-emerald-600/20 to-transparent border-emerald-500/20' },
          { icon: <Bell size={24} className="text-amber-400" />, label: 'Unread Alerts', value: '2', color: 'from-amber-600/20 to-transparent border-amber-500/20' },
          { icon: <Users size={24} className="text-indigo-400" />, label: 'Registered Apps', value: '2', color: 'from-indigo-600/20 to-transparent border-indigo-500/20' },
        ].map((stat, i) => (
          <Card key={i} className={`bg-gradient-to-br ${stat.color} border flex items-center gap-4`}>
            <div className="p-3 bg-[rgba(255,255,255,0.05)] rounded-lg">
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Notices */}
        <Card className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-3">
            <h2 className="text-xl font-semibold flex items-center gap-2"><FileText size={20} className="text-blue-400"/> Recent Notices</h2>
            <Link to="/notices" className="text-sm text-blue-400 hover:text-blue-300 flex items-center group">
              View all <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {data.notices.map((notice) => (
              <div key={notice.id} className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-blue-100">{notice.title}</h3>
                  <Badge variant={notice.priority === 'high' ? 'danger' : notice.priority === 'medium' ? 'warning' : 'default'}>{notice.category}</Badge>
                </div>
                <p className="text-sm text-slate-400 line-clamp-2">{notice.content}</p>
                <div className="mt-3 text-xs text-slate-500">
                  Posted on {notice.date}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.1)] pb-3">
            <h2 className="text-xl font-semibold flex items-center gap-2"><Calendar size={20} className="text-emerald-400"/> Upcoming Events</h2>
          </div>
          <div className="flex flex-col gap-4">
            {data.events.map((event) => (
              <div key={event.id} className="group relative overflow-hidden rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] p-4 flex gap-4 items-center">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  <span className="text-lg font-bold leading-none">{new Date(event.date).getDate()}</span>
                </div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-emerald-400 transition-colors line-clamp-1">{event.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    {event.time}
                  </p>
                </div>
              </div>
            ))}
            <Link to="/events" className="w-full text-center py-2 text-sm text-slate-300 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors mt-2">
              See more events
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
