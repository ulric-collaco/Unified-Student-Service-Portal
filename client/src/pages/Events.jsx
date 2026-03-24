import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Calendar as CalIcon, MapPin, Users, CheckCircle2 } from 'lucide-react';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await api.getEvents();
    if (res?.success) setEvents(res.data);
    setLoading(false);
  };

  const currentUserId = "student_001"; // Mock authenticated user

  const handleRegister = async (eventId) => {
    setRegistering(eventId);
    const res = await api.registerEvent(eventId, currentUserId);
    if (res?.success) {
      // Optimitic update
      setEvents(events.map(ev => {
        if (ev.id === eventId) {
          return {
            ...ev, 
            registeredUsers: [...ev.registeredUsers, currentUserId],
            attendeeCount: ev.attendeeCount + 1,
            spotsLeft: ev.spotsLeft - 1
          };
        }
        return ev;
      }));
    } else {
      alert(res?.message || 'Failed to register');
    }
    setRegistering(null);
  };

  if (loading) return <div className="text-center p-10 text-slate-400">Loading events...</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <div>
           <h1 className="text-3xl font-bold">Campus Events</h1>
           <p className="text-slate-400 text-sm mt-1">Discover and register for upcoming activities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const isRegistered = event.registeredUsers.includes(currentUserId);
          const isFull = event.spotsLeft <= 0;
          
          return (
            <Card key={event.id} padding="none" className="flex flex-col group h-full">
              {/* Event Image Placeholder */}
              <div className="h-40 relative bg-gradient-to-br from-slate-700 to-slate-900 border-b border-[rgba(255,255,255,0.05)] overflow-hidden">
                 <div className="absolute inset-0 opacity-30 bg-pattern"></div>
                 <div className="absolute top-4 left-4">
                   <Badge variant="primary">{event.category}</Badge>
                 </div>
                 <div className="absolute bottom-[-1px] left-0 w-full h-1/2 bg-gradient-to-t from-[var(--glass-bg)] to-transparent"></div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-emerald-400 transition-colors">
                  {event.title}
                </h3>
                
                <div className="flex flex-col gap-2 mb-4 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CalIcon size={16} className="text-emerald-500" />
                    <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-red-400" />
                    <span>{event.venue}</span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-1">
                  {event.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[rgba(255,255,255,0.1)]">
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
                    <Users size={14} />
                    <span>{event.attendeeCount} / {event.maxAttendees}</span>
                  </div>
                  
                  {isRegistered ? (
                    <div className="flex items-center gap-1 text-emerald-400 text-sm font-bold bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/20">
                      <CheckCircle2 size={16} />
                      Registered
                    </div>
                  ) : (
                    <Button 
                      variant={isFull ? 'secondary' : 'primary'} 
                      size="sm" 
                      onClick={() => handleRegister(event.id)}
                      disabled={isFull || registering === event.id}
                      className={!isFull ? 'bg-emerald-600 hover:bg-emerald-500 border-emerald-500' : ''}
                    >
                      {registering === event.id ? 'Registering...' : isFull ? 'Event Full' : 'Register Now'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
