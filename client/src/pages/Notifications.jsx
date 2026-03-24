import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Bell, Check, Info, AlertTriangle, Calendar, Award } from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await api.getNotifications();
    if (res?.success) setNotifications(res.data);
    setLoading(false);
  };

  const markAsRead = async (id) => {
    const res = await api.markNotificationRead(id);
    if (res?.success) {
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  const markAllAsRead = async () => {
    const res = await api.markAllNotificationsRead();
    if (res?.success) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'notice': return <Info size={20} className="text-blue-400" />;
      case 'event': return <Calendar size={20} className="text-emerald-400" />;
      case 'alert': return <AlertTriangle size={20} className="text-amber-400" />;
      case 'system': return <Award size={20} className="text-indigo-400" />;
      default: return <Bell size={20} className="text-slate-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) return <div className="text-center p-10 text-slate-400">Loading notifications...</div>;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-2 border-b border-[rgba(255,255,255,0.1)] pb-4">
        <div>
           <h1 className="text-3xl font-bold flex items-center gap-3">
             Notifications
             {unreadCount > 0 && <Badge variant="danger" className="ml-2 text-sm">{unreadCount} New</Badge>}
           </h1>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllAsRead}>
            <Check size={16} className="mr-2" /> Mark all read
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {notifications.length === 0 ? (
          <div className="text-center p-12 text-slate-400 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.05)]">
            <Bell size={48} className="mx-auto text-slate-600 mb-4 opacity-50" />
            <p className="text-lg font-medium text-slate-300">No notifications yet</p>
            <p className="text-sm">You're all caught up!</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <Card 
              key={notif.id}
              padding="p-4"
              className={`flex gap-4 relative overflow-hidden transition-all ${notif.read ? 'opacity-70 grayscale-[20%]' : 'border-l-4 border-l-blue-500 bg-[rgba(59,130,246,0.05)]'}`}
            >
              <div className="mt-1 bg-[rgba(255,255,255,0.05)] p-2 rounded-full h-fit border border-[rgba(255,255,255,0.05)]">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-semibold ${notif.read ? 'text-slate-300' : 'text-white'}`}>{notif.title}</h3>
                  <span className="text-xs text-slate-500 whitespace-nowrap ml-4">
                    {new Date(notif.timestamp).toLocaleString([], {month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-2">{notif.message}</p>
                
                <div className="flex gap-2">
                  <a href={notif.link} className="text-xs px-3 py-1 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] rounded transition-colors text-blue-300">
                    View Details
                  </a>
                  {!notif.read && (
                    <button onClick={() => markAsRead(notif.id)} className="text-xs px-3 py-1 text-slate-400 hover:text-white transition-colors">
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
