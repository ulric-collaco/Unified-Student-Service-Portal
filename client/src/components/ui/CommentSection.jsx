import React, { useState } from 'react';
import Button from './Button';
import { Send, User } from 'lucide-react';

export default function CommentSection({ comments = [], onAddComment }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      <h3 className="text-lg font-semibold border-b border-[rgba(255,255,255,0.1)] pb-2 mb-2">
        Comments ({comments.length})
      </h3>
      
      <div className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {comments.length === 0 ? (
          <p className="text-sm text-slate-400 italic">No comments yet. Be the first to start the discussion!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm shrink-0">
                {comment.avatar || <User size={18} />}
              </div>
              <div className="flex-1 bg-[rgba(255,255,255,0.03)] rounded-lg p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-blue-300">{comment.user}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(comment.timestamp).toLocaleDateString()} {new Date(comment.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                <p className="text-sm text-slate-200 whitespace-pre-wrap">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
        />
        <Button type="submit" disabled={!newComment.trim()} icon={<Send size={16} />}>
          Post
        </Button>
      </form>
    </div>
  );
}
