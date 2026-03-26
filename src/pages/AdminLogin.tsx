import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { motion } from 'motion/react';
import { Shield, Lock, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAdminAuth = useAuthStore((state) => state.setAdminAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Admin login failed');
      }

      setAdminAuth(data.token);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#ff3333] font-mono flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#330000,transparent_70%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-[#300] p-8 rounded-lg shadow-[0_0_40px_rgba(255,0,0,0.05)] relative z-10"
      >
        <button 
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-[#444] hover:text-[#ff3333] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#ff3333]/10 rounded-full flex items-center justify-center mb-4 border border-[#ff3333]/30">
            <Shield className="w-8 h-8 text-[#ff3333]" />
          </div>
          <h1 className="text-2xl font-bold tracking-[0.2em] uppercase">Admin Node</h1>
          <p className="text-[#444] text-xs mt-2 uppercase tracking-widest">Restricted Management Interface</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase mb-2 text-[#444] tracking-[0.3em]">Master Access Key</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#222]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#000] border border-[#200] rounded p-3 pl-10 focus:outline-none focus:border-[#ff3333] transition-colors text-[#ff3333]"
                placeholder="ROOT_PASSWORD"
                required
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-950/30 border border-red-900/50 text-red-500 p-3 rounded text-[10px] flex items-center gap-2 uppercase tracking-wider"
            >
              <AlertCircle className="w-4 h-4" />
              Access Denied: {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff3333] text-black font-bold py-3 rounded uppercase tracking-[0.2em] hover:bg-[#ff0000] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Authenticate Admin'}
          </button>
        </form>

        <div className="mt-8 flex justify-between items-center text-[8px] text-[#222] uppercase tracking-widest">
          <span>Encrypted_TLS_v1.3</span>
          <span>Node_ID: 0x7F000001</span>
        </div>
      </motion.div>
    </div>
  );
}
