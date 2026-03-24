import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { User, Mail, Phone, BookOpen, Clock, ShieldCheck, Edit3 } from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await api.getProfile();
    if (res?.success) setProfile(res.data);
    setLoading(false);
  };

  if (loading) return <div className="text-center p-10 text-slate-400">Loading profile...</div>;
  if (!profile) return <div className="text-center p-10 text-slate-400">Profile not found.</div>;

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="relative mb-16">
        {/* Cover Image */}
        <div className="h-48 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 overflow-hidden relative border border-[rgba(255,255,255,0.1)]">
          <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        </div>
        
        {/* Avatar & Header */}
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="w-32 h-32 rounded-2xl bg-slate-800 border-4 border-slate-900 shadow-xl flex items-center justify-center overflow-hidden">
             <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
               {profile.avatar}
             </span>
          </div>
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-white leading-tight">{profile.name}</h1>
            <p className="text-slate-300 font-medium flex items-center gap-2">
              {profile.rollNo} • {profile.branch} 
              <Badge variant="success" className="ml-2 scale-90"><ShieldCheck size={12} className="mr-1 inline"/> Verified Student</Badge>
            </p>
          </div>
        </div>
        
        <button className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur text-white p-2 rounded-lg transition-colors flex items-center gap-2 text-sm border border-white/10">
          <Edit3 size={16} /> Edit Profile Cover
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        
        <div className="md:col-span-1 flex flex-col gap-6">
          <Card className="flex flex-col gap-4">
            <h2 className="text-lg font-bold border-b border-[rgba(255,255,255,0.1)] pb-2 mb-2 text-slate-200">Contact Information</h2>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] flex flex-shrink-0 items-center justify-center text-slate-400"><Mail size={16} /></div>
              <div className="overflow-hidden">
                <p className="text-slate-500 text-xs font-semibold uppercase">Email Address</p>
                <p className="text-slate-200 truncate" title={profile.email}>{profile.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] flex flex-shrink-0 items-center justify-center text-slate-400"><Phone size={16} /></div>
              <div>
                <p className="text-slate-500 text-xs font-semibold uppercase">Phone Number</p>
                <p className="text-slate-200">{profile.phone}</p>
              </div>
            </div>
            
            <button className="mt-4 w-full py-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] rounded-lg text-sm transition-colors text-blue-400 font-medium border border-[rgba(255,255,255,0.05)] border-dashed">
              Update Contact Details
            </button>
          </Card>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <Card>
             <h2 className="text-lg font-bold border-b border-[rgba(255,255,255,0.1)] pb-2 mb-4 text-slate-200">Academic Overview</h2>
             
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               <div className="p-4 rounded-xl bg-[rgba(59,130,246,0.1)] border border-blue-500/20 text-center">
                 <p className="text-blue-400 font-semibold mb-1"><BookOpen size={20} className="mx-auto mb-2"/></p>
                 <p className="text-2xl font-bold text-white">{profile.semester}</p>
                 <p className="text-[10px] uppercase text-blue-300 font-bold tracking-wider mt-1">Current Term</p>
               </div>
               
               <div className="p-4 rounded-xl bg-[rgba(16,185,129,0.1)] border border-emerald-500/20 text-center">
                 <p className="text-emerald-400 font-semibold mb-1"><Award size={20} className="mx-auto mb-2"/></p>
                 <p className="text-2xl font-bold text-white">{profile.cgpa}</p>
                 <p className="text-[10px] uppercase text-emerald-300 font-bold tracking-wider mt-1">Current CGPA</p>
               </div>
               
               <div className="p-4 rounded-xl bg-[rgba(245,158,11,0.1)] border border-amber-500/20 text-center">
                 <p className="text-amber-400 font-semibold mb-1"><Clock size={20} className="mx-auto mb-2"/></p>
                 <p className="text-2xl font-bold text-white">{profile.credits}</p>
                 <p className="text-[10px] uppercase text-amber-300 font-bold tracking-wider mt-1">Earned Credits</p>
               </div>
               
               <div className="p-4 rounded-xl bg-[rgba(139,92,246,0.1)] border border-purple-500/20 text-center">
                 <p className="text-purple-400 font-semibold mb-1"><Calendar size={20} className="mx-auto mb-2"/></p>
                 <p className="text-2xl font-bold text-white">{profile.registeredEvents?.length || 0}</p>
                 <p className="text-[10px] uppercase text-purple-300 font-bold tracking-wider mt-1">Registered Events</p>
               </div>
             </div>
          </Card>

          <Card>
            <h2 className="text-lg font-bold border-b border-[rgba(255,255,255,0.1)] pb-2 mb-4 text-slate-200">Recent Activity</h2>
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-2.5 top-2 bottom-2 w-px bg-[rgba(255,255,255,0.1)]"></div>
              
              <div className="flex items-start gap-4 z-10">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex-shrink-0 mt-1 shadow-[0_0_10px_rgba(16,185,129,0.5)] border-2 border-[var(--bg-secondary)]"></div>
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg p-3 flex-1 flex flex-col gap-1 hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <p className="text-sm font-medium text-slate-200">Registered for TechZen 2026</p>
                  <p className="text-xs text-slate-400">Mar 19, 2026 at 2:30 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 z-10">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex-shrink-0 mt-1 shadow-[0_0_10px_rgba(59,130,246,0.5)] border-2 border-[var(--bg-secondary)]"></div>
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg p-3 flex-1 flex flex-col gap-1 hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <p className="text-sm font-medium text-slate-200">Updated Profile Contact Information</p>
                  <p className="text-xs text-slate-400">Mar 12, 2026 at 4:00 PM</p>
                </div>
              </div>

               <div className="flex items-start gap-4 z-10">
                <div className="w-5 h-5 rounded-full bg-slate-600 flex-shrink-0 mt-1 shadow-[0_0_5px_rgba(255,255,255,0.1)] border-2 border-[var(--bg-secondary)]"></div>
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg p-3 flex-1 flex flex-col gap-1 hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <p className="text-sm font-medium text-slate-200">Commented on Exam Schedule Notice</p>
                  <p className="text-xs text-slate-400">Mar 10, 2026 at 11:15 AM</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
