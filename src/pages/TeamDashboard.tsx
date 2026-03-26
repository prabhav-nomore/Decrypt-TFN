import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Terminal, 
  ChevronRight,
  HelpCircle,
  Hash,
  Send,
  Loader2,
  Shield,
  SkipForward,
  Zap
} from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface Puzzle {
  puzzle_id: string;
  puzzle_text: string;
  reference_type: string;
}

interface Assignment {
  puzzle_id: string;
  start_time: number;
  status: string;
}

export default function TeamDashboard() {
  const { teamId, teamName, teamToken, logoutTeam } = useAuthStore();
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [stats, setStats] = useState({ solved: 0, attempts: 0 });
  const [lifeline, setLifeline] = useState({ lifeline_remaining: 3, lifeline_used: 0 });
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isGracePeriod, setIsGracePeriod] = useState(false);
  const [graceTimer, setGraceTimer] = useState(0);
  const [sessionEndTime, setSessionEndTime] = useState<number | null>(null);
  const [mainTimer, setMainTimer] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const reportViolation = (type: string) => {
      if (isGracePeriod) return; // Ignore violations during grace period

      const payload = JSON.stringify({ teamId, type, token: teamToken });
      const blob = new Blob([payload], { type: 'application/json' });
      
      // Use sendBeacon for reliable reporting during exit
      navigator.sendBeacon('/api/team/violation', blob);
      
      // Also try regular fetch if we're not exiting
      if (type !== 'exited_session') {
        fetch('/api/team/violation', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${teamToken}`
          },
          body: payload,
        }).catch(console.error);
      }
      
      logoutTeam();
      window.close();
      window.location.href = '/?error=SECURITY_VIOLATION';
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        reportViolation('tab_switch');
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // This is called when closing tab or browser
      reportViolation('exited_session');
      // Standard way to show a confirmation dialog (though we want to ban them anyway)
      e.preventDefault();
      e.returnValue = '';
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        reportViolation('exited_fullscreen');
      }
    };

    const handleCopyPaste = (e: ClipboardEvent) => {
      if (!isGracePeriod) {
        e.preventDefault();
        setMessage({ text: 'SECURITY_ALERT: Copy/Paste is disabled. Use a lifeline for temporary access.', type: 'error' });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
    };
  }, [teamId, teamToken, logoutTeam, isGracePeriod]);

  // Grace period timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGracePeriod && graceTimer > 0) {
      interval = setInterval(() => {
        setGraceTimer((prev) => {
          if (prev === 31) {
            setMessage({ text: 'WARNING: Lifeline expiring in 30 seconds. Prepare for protocol re-engagement.', type: 'error' });
          }
          return prev - 1;
        });
      }, 1000);
    } else if (graceTimer === 0 && isGracePeriod) {
      setIsGracePeriod(false);
      setMessage({ text: 'GRACE_PERIOD_EXPIRED: Security protocols re-engaged.', type: 'error' });
    }
    return () => clearInterval(interval);
  }, [isGracePeriod, graceTimer]);

  // Main session timer
  useEffect(() => {
    if (!sessionEndTime || isPaused) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((sessionEndTime - now) / 1000));
      setMainTimer(diff);

      if (diff <= 0) {
        logoutTeam();
        window.location.href = '/?error=SESSION_EXPIRED';
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [sessionEndTime, logoutTeam]);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('join_team', teamId);
    });

    newSocket.on('puzzle_assigned', (data) => {
      fetchCurrentState();
      setMessage({ text: 'New puzzle assigned!', type: 'success' });
    });

    return () => {
      newSocket.close();
    };
  }, [teamId]);

  const fetchCurrentState = async () => {
    try {
      const response = await fetch(`/api/team/status?teamId=${teamId}`, {
        headers: { 'Authorization': `Bearer ${teamToken}` }
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentPuzzle(data.puzzle);
        setAssignment(data.assignment);
        setStats(data.stats);
        setLifeline(data.lifeline);
        setSessionEndTime(data.sessionEndTime);
        setIsPaused(data.isPaused);
      }
    } catch (err) {
      console.error('Failed to fetch state');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentState();
  }, []);

  const handleSkip = async () => {
    if (!currentPuzzle) return;
    
    setSubmitting(true);
    try {
      const response = await fetch('/api/skip', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${teamToken}`
        },
        body: JSON.stringify({ teamId, puzzleId: currentPuzzle.puzzle_id }),
      });

      if (response.ok) {
        setMessage({ text: 'Puzzle skipped. Assigning new node...', type: 'error' });
        setAnswer('');
        fetchCurrentState();
      }
    } catch (err) {
      console.error('Failed to skip');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLifeline = async () => {
    if (lifeline.lifeline_remaining <= 0 || isGracePeriod) return;

    try {
      const response = await fetch('/api/lifeline/use', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${teamToken}`
        },
        body: JSON.stringify({ teamId }),
      });

      if (response.ok) {
        const data = await response.json();
        setLifeline(data.lifeline);
        setIsGracePeriod(true);
        setGraceTimer(120); // 2 minutes
        setMessage({ text: 'LIFELINE_ACTIVATED: Security protocols suspended for 120s. Tab switching and copy/paste enabled.', type: 'success' });
      }
    } catch (err) {
      console.error('Failed to use lifeline');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${teamToken}`
        },
        body: JSON.stringify({ teamId, puzzleId: currentPuzzle?.puzzle_id, answer }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.result === 'correct') {
          setMessage({ text: 'CORRECT! Access granted to next node.', type: 'success' });
          setAnswer('');
          fetchCurrentState();
        } else {
          setMessage({ text: 'INCORRECT. Access denied. Try again.', type: 'error' });
        }
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#00ff00] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ff00] font-mono p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12 border-b border-[#222] pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#00ff00]/10 rounded flex items-center justify-center border border-[#00ff00]/30">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold uppercase tracking-widest">{teamName}</h1>
            <p className="text-[#444] text-xs uppercase tracking-tighter">Node ID: {teamId}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!document.fullscreenElement && (
            <button 
              onClick={enterFullscreen}
              className="px-4 py-2 bg-[#00ff00]/10 border border-[#00ff00]/30 rounded text-[10px] uppercase tracking-widest hover:bg-[#00ff00]/20 transition-all"
            >
              Enter Secure Mode
            </button>
          )}
          <button 
            onClick={logoutTeam}
            className="flex items-center gap-2 text-[#444] hover:text-red-500 transition-colors text-xs uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </button>
        </div>
      </header>

      {!document.fullscreenElement && (
        <div className="fixed inset-0 z-50 bg-[#000]/95 flex flex-col items-center justify-center p-8 text-center space-y-8">
          <div className="w-20 h-20 bg-[#00ff00]/10 rounded-full flex items-center justify-center border border-[#00ff00]/30 animate-pulse">
            <Shield className="w-10 h-10 text-[#00ff00]" />
          </div>
          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl font-bold uppercase tracking-[0.2em]">Secure Session Required</h2>
            <p className="text-[#666] text-sm leading-relaxed">
              To proceed with the test, you must enter secure full-screen mode. Switching tabs, minimizing the browser, or exiting full-screen will result in an immediate and permanent ban.
            </p>
          </div>
          <button 
            onClick={enterFullscreen}
            className="px-12 py-4 bg-[#00ff00] text-black font-bold rounded uppercase tracking-widest hover:bg-[#00cc00] transition-all"
          >
            Initialize Secure Mode
          </button>
        </div>
      )}

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {!currentPuzzle ? (
              <motion.div 
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#111] border border-[#00ff00]/20 p-12 rounded-lg text-center space-y-6"
              >
                <div className="w-20 h-20 bg-[#00ff00]/10 rounded-full flex items-center justify-center mx-auto border border-[#00ff00]/30">
                  <Trophy className="w-10 h-10 text-[#00ff00]" />
                </div>
                <h2 className="text-3xl font-bold uppercase tracking-[0.2em]">All Nodes Cleared</h2>
                <p className="text-[#666] max-w-md mx-auto">
                  Congratulations, Team {teamName}. You have successfully navigated the network and decrypted all available data packets.
                </p>
                <div className="pt-4">
                  <span className="inline-block px-4 py-2 bg-[#00ff00]/10 border border-[#00ff00]/30 rounded text-xs uppercase tracking-widest">
                    Status: Mission Accomplished
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="puzzle"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-[#111] border border-[#333] rounded-lg overflow-hidden">
                  <div className="bg-[#1a1a1a] px-6 py-3 border-b border-[#333] flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-[#00ff00]" />
                      <span className="text-xs uppercase tracking-widest font-bold">Active Objective: {currentPuzzle.puzzle_id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#444]">
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-tighter">Started: {new Date(assignment?.start_time || 0).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="prose prose-invert max-w-none">
                      <div className="bg-[#050505] p-6 rounded border border-[#222] font-mono text-sm leading-relaxed whitespace-pre-wrap">
                        {currentPuzzle.puzzle_text}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <ChevronRight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                        <input
                          type="text"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          className="w-full bg-[#050505] border border-[#333] rounded p-4 pl-10 focus:outline-none focus:border-[#00ff00] transition-colors placeholder:text-[#222]"
                          placeholder="ENTER_DECRYPTION_KEY_HERE"
                          disabled={submitting}
                          autoFocus
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          disabled={submitting || !answer.trim()}
                          className="flex-1 bg-[#00ff00] text-black font-bold py-4 rounded uppercase tracking-widest hover:bg-[#00cc00] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                              <Send className="w-4 h-4" />
                              Submit Decryption
                            </>
                          )}
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleSkip}
                          disabled={submitting || isGracePeriod}
                          className={`px-8 bg-[#111] border border-[#333] text-[#444] font-bold py-4 rounded uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                            isGracePeriod 
                              ? 'opacity-50 cursor-not-allowed' 
                              : 'hover:border-[#ff3333] hover:text-[#ff3333]'
                          }`}
                        >
                          <SkipForward className="w-4 h-4" />
                          Skip
                        </button>
                      </div>
                    </form>

                    {message && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded border text-xs flex items-center gap-3 uppercase tracking-wider ${
                          message.type === 'success' 
                            ? 'bg-green-900/20 border-green-900/50 text-green-500' 
                            : 'bg-red-900/20 border-red-900/50 text-red-500'
                        }`}
                      >
                        {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        {message.text}
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#111] border border-[#333] p-4 rounded flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded flex items-center justify-center border border-blue-500/30">
                      <HelpCircle className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#444] uppercase tracking-widest">Puzzle Type</p>
                      <p className="text-sm uppercase">{currentPuzzle.reference_type}</p>
                    </div>
                  </div>
                  <div className="bg-[#111] border border-[#333] p-4 rounded flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500/10 rounded flex items-center justify-center border border-purple-500/30">
                      <Clock className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#444] uppercase tracking-widest">Time Limit</p>
                      <p className={`text-sm uppercase font-bold ${isPaused ? 'text-yellow-500' : (mainTimer && mainTimer < 300 ? 'text-red-500 animate-pulse' : '')}`}>
                        {isPaused ? (
                          'PAUSED'
                        ) : mainTimer !== null ? (
                          `${Math.floor(mainTimer / 60).toString().padStart(2, '0')}:${(mainTimer % 60).toString().padStart(2, '0')}`
                        ) : (
                          'Calculating...'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-[#111] border border-[#333] rounded-lg p-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 border-b border-[#222] pb-4">Network Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#444] uppercase">Connection</span>
                <span className="text-[#00ff00] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00ff00] rounded-full animate-pulse" />
                  STABLE
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#444] uppercase">Encryption</span>
                <span className="text-[#00ff00]">AES-256</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#444] uppercase">Uptime</span>
                <span className="text-[#666]">99.9%</span>
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-[#333] rounded-lg p-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 border-b border-[#222] pb-4">Team Intel</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#00ff00]/5 border border-[#00ff00]/20 rounded flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#00ff00]" />
                </div>
                <div>
                  <p className="text-[10px] text-[#444] uppercase tracking-widest">Solved</p>
                  <p className="text-lg font-bold">{stats.solved}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-500/5 border border-yellow-500/20 rounded flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-[10px] text-[#444] uppercase tracking-widest">Attempts</p>
                  <p className="text-lg font-bold">{stats.attempts}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-[#222]">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[10px] text-[#444] uppercase tracking-widest">Lifelines Remaining</p>
                </div>
                <div className="flex gap-2 mb-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 flex-1 rounded-full ${i < lifeline.lifeline_remaining ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-[#222]'}`} 
                    />
                  ))}
                </div>
                <button
                  onClick={handleLifeline}
                  disabled={lifeline.lifeline_remaining <= 0 || isGracePeriod}
                  className={`w-full py-3 rounded border text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 ${
                    isGracePeriod 
                      ? 'bg-blue-500/10 border-blue-500/50 text-blue-500 cursor-not-allowed' 
                      : lifeline.lifeline_remaining > 0
                        ? 'bg-[#111] border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-black'
                        : 'bg-[#111] border-[#222] text-[#333] cursor-not-allowed'
                  }`}
                >
                  <Zap className={`w-4 h-4 ${isGracePeriod ? 'animate-pulse' : ''}`} />
                  {isGracePeriod ? 'Active' : 'Activate Lifeline'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[#222] text-center text-[10px] text-[#333] uppercase tracking-[0.5em]">
        TFN_TEST_SITE // SECURE_COMMUNICATION_PROTOCOL_v4.2
      </footer>
    </div>
  );
}
