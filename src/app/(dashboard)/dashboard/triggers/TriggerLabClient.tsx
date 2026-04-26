'use client';

import { useState, useTransition } from 'react';
import { createCommentTrigger, deleteCommentTrigger } from '@/app/actions/triggers';
import { Zap, MessageSquare, Link as LinkIcon, Trash2, Plus, Sparkles, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Trigger {
  id: string;
  keyword: string;
  response_type: string;
  payload: any;
  created_at: string;
}

interface TriggerLabClientProps {
  initialTriggers: Trigger[];
}

const MOCK_USER_ID = '123e4567-e89b-12d3-a456-426614174000';

export default function TriggerLabClient({ initialTriggers }: TriggerLabClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [keyword, setKeyword] = useState('');
  const [responseType, setResponseType] = useState<'link' | 'AI'>('link');
  const [payloadText, setPayloadText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const placeholderText = responseType === 'link' 
    ? 'Paste your URL here' 
    : 'Give the AI instructions and your link here (e.g., "Send them my pricing page link: https://vellum.example/pricing")';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword || !payloadText) return;
    
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('user_id', MOCK_USER_ID);
    formData.append('keyword', keyword);
    formData.append('response_type', responseType);
    
    // For link, the payload is just the URL. For AI, it's the prompt instructions.
    const payloadData = responseType === 'link' 
      ? { url: payloadText } 
      : { instructions: payloadText };
      
    formData.append('payload', JSON.stringify(payloadData));

    const result = await createCommentTrigger(formData);
    
    setIsSubmitting(false);
    
    if (result.error) {
      alert(`Error saving trigger: ${result.error}`);
    } else {
      setKeyword('');
      setPayloadText('');
      startTransition(() => {
        router.refresh();
      });
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const result = await deleteCommentTrigger(id);
    setDeletingId(null);
    
    if (result.error) {
      alert(`Error deleting trigger: ${result.error}`);
    } else {
      startTransition(() => {
        router.refresh();
      });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Zap className="text-violet-accent w-8 h-8" />
          Trigger Lab
        </h1>
        <p className="text-gray-400 mt-2">
          Build smart comment automations. When your followers drop a keyword, Vellum takes action.
        </p>
      </header>

      {/* Trigger Form Card */}
      <div className="relative group">
        <div className="absolute inset-0 bg-violet-accent/20 rounded-2xl blur-xl transition-all duration-500 group-hover:bg-violet-accent/30 opacity-50"></div>
        <div className="relative bg-[#0d0d0d]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-violet-accent" />
            Create New Trigger
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field 1: Keyword */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Comment Keyword
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g., DUB"
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-accent focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Response Style */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Response Style
                </label>
                <div className="flex rounded-lg bg-black/50 p-1 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setResponseType('link')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
                      responseType === 'link'
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <LinkIcon className="w-4 h-4" />
                    Direct Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setResponseType('AI')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
                      responseType === 'AI'
                        ? 'bg-violet-accent/20 text-violet-accent shadow-sm'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    AI Assistant
                  </button>
                </div>
              </div>
            </div>

            {/* Field 3: What to Send */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                What to Send
              </label>
              <textarea
                value={payloadText}
                onChange={(e) => setPayloadText(e.target.value)}
                placeholder={placeholderText}
                rows={4}
                className="block w-full p-4 border border-white/10 rounded-lg bg-black/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-accent focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !keyword || !payloadText}
                className="flex items-center gap-2 px-6 py-3 bg-violet-accent hover:bg-violet-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors shadow-lg shadow-violet-accent/20"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                Save Trigger
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Triggers List */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-white mb-6">Your Active Triggers</h2>
        
        {initialTriggers.length === 0 ? (
          <div className="bg-[#0d0d0d]/40 border border-white/5 border-dashed rounded-xl p-12 text-center">
            <Zap className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300">No triggers yet</h3>
            <p className="text-gray-500 mt-2">Create your first trigger above to start automating.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {initialTriggers.map((trigger) => (
              <div 
                key={trigger.id} 
                className="flex items-center justify-between p-5 bg-[#0d0d0d]/60 border border-white/10 rounded-xl hover:border-violet-accent/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${trigger.response_type === 'AI' ? 'bg-violet-accent/20 text-violet-accent' : 'bg-white/10 text-gray-300'}`}>
                    {trigger.response_type === 'AI' ? <Sparkles className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider">{trigger.keyword}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400 font-medium">
                        {trigger.response_type === 'AI' ? 'AI Agent' : 'Direct Link'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1 truncate max-w-md">
                      {trigger.payload?.url || trigger.payload?.instructions || JSON.stringify(trigger.payload)}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(trigger.id)}
                  disabled={deletingId === trigger.id}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors disabled:opacity-50"
                  aria-label="Delete trigger"
                >
                  {deletingId === trigger.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
