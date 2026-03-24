import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import CommentSection from '../components/ui/CommentSection';
import { Search, Filter, MessageSquare } from 'lucide-react';

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const res = await api.getNotices();
    if (res?.success) setNotices(res.data);
    setLoading(false);
  };

  const handleAddComment = async (text) => {
    if (!selectedNotice) return;
    const res = await api.addComment(selectedNotice.id, "Aarav Singh", text);
    if (res?.success) {
      const updatedNotice = { ...selectedNotice, comments: [...selectedNotice.comments, res.data] };
      setSelectedNotice(updatedNotice);
      setNotices(notices.map(n => n.id === updatedNotice.id ? updatedNotice : n));
    }
  };

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) || 
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center p-10 text-slate-400">Loading notices...</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Official Notices</h1>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search notices..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="p-2 border border-[rgba(255,255,255,0.1)] rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
            <Filter size={20} className="text-slate-300" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredNotices.length === 0 ? (
          <div className="text-center p-10 text-slate-400 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.05)]">
            No notices found matching "{search}"
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <Card 
              key={notice.id} 
              hover={true} 
              onClick={() => setSelectedNotice(notice)}
              className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant={notice.priority === 'high' ? 'danger' : notice.priority === 'medium' ? 'warning' : 'default'}>
                    {notice.category}
                  </Badge>
                  <span className="text-xs text-slate-400">{notice.date} • By {notice.author}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">{notice.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-2 md:line-clamp-1">{notice.content}</p>
              </div>
              <div className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors shrink-0">
                <MessageSquare size={18} />
                <span className="text-sm font-medium">{notice.comments?.length || 0}</span>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal 
        isOpen={!!selectedNotice} 
        onClose={() => setSelectedNotice(null)}
        title={selectedNotice?.category + ' Notice'}
      >
        {selectedNotice && (
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-white">{selectedNotice.title}</h2>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400 mb-4 pb-4 border-b border-[rgba(255,255,255,0.1)]">
                <span>By {selectedNotice.author}</span>
                <span>•</span>
                <span>{selectedNotice.date}</span>
                <span>•</span>
                <Badge variant={selectedNotice.priority === 'high' ? 'danger' : selectedNotice.priority === 'medium' ? 'warning' : 'default'}>
                  {selectedNotice.priority} priority
                </Badge>
              </div>
              <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedNotice.content}
              </p>
            </div>
            
            <CommentSection 
              comments={selectedNotice.comments} 
              onAddComment={handleAddComment} 
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
