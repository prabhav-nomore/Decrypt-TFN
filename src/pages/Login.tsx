import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { motion } from 'motion/react';
import { Terminal, Lock, User, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const [teamId, setTeamId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setTeamAuth = useAuthStore((state) => state.setTeamAuth);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get('error');
    if (errorParam === 'SECURITY_VIOLATION') {
      setError('SECURITY_VIOLATION: Tab switch or exit detected. Node access has been permanently revoked.');
    } else if (errorParam === 'SESSION_EXPIRED') {
      setError('SESSION_EXPIRED: Your allocated time has reached 00:00. Access has been automatically terminated.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setTeamAuth(data.token, data.teamId, data.teamName);
      navigate('/team');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ff00] font-mono flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#003300,transparent_70%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#111] border border-[#333] p-8 rounded-lg shadow-[0_0_30px_rgba(0,255,0,0.1)] relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#00ff00]/10 rounded-full flex items-center justify-center mb-4 border border-[#00ff00]/30">
            <Terminal className="w-8 h-8 text-[#00ff00]" />
          </div>
          <h1 className="text-2xl font-bold tracking-widest uppercase">System Access</h1>
          <p className="text-[#666] text-sm mt-2 uppercase tracking-tighter">Terminal Authorization Required</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase mb-2 text-[#666] tracking-widest">Team Identifier</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
              <input
                type="text"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                className="w-full bg-[#050505] border border-[#333] rounded p-3 pl-10 focus:outline-none focus:border-[#00ff00] transition-colors"
                placeholder="TEAM_ID"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase mb-2 text-[#666] tracking-widest">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050505] border border-[#333] rounded p-3 pl-10 focus:outline-none focus:border-[#00ff00] transition-colors"
                placeholder="********"
                required
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-900/20 border border-red-900/50 text-red-500 p-3 rounded text-xs flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00ff00] text-black font-bold py-3 rounded uppercase tracking-widest hover:bg-[#00cc00] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Initialize Session'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#222] text-center">
          <button 
            onClick={() => navigate('/admin/login')}
            className="text-[#444] text-xs uppercase hover:text-[#00ff00] transition-colors tracking-widest"
          >
            Switch to Admin Terminal
          </button>
        </div>
      </motion.div>

      <div className="fixed bottom-4 right-4 text-[10px] text-[#333] uppercase tracking-widest">
        v0.4.2 // secure_link_active
      </div>
    </div>
  );
}
