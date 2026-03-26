import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store';
import { motion } from 'motion/react';
import { 
  Users, 
  Puzzle, 
  Activity, 
  LogOut, 
  Plus, 
  RefreshCw, 
  Search, 
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Loader2,
  Trophy,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface Team {
  team_id: string;
  team_name: string;
  is_banned: boolean;
  current_puzzle_id?: string;
  solved_count?: number;
  incorrect_count?: number;
  lifeline_remaining?: number;
  session_paused_at?: number | null;
  paused_duration?: number;
  points?: number;
}

interface LiveEvent {
  id: string;
  type: 'submission' | 'login' | 'error';
  message: string;
  timestamp: number;
}

export default function AdminDashboard() {
  const { adminToken, logoutAdmin } = useAuthStore();
  const [teams, setTeams] = useState<Team[]>([]);
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [newTeam, setNewTeam] = useState({ id: '', name: '', password: '' });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [showFullscreenLeaderboard, setShowFullscreenLeaderboard] = useState(false);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('join_admin');
    });

    newSocket.on('new_event', (event: LiveEvent) => {
      setEvents(prev => [event, ...prev].slice(0, 50));
      fetchTeams(); // Refresh team list on events
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch('/api/admin/teams', {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      const data = await response.json();
      if (response.ok) {
        const processedTeams = data.map((t: any) => ({
          ...t,
          points: t.points !== undefined ? t.points : (t.solved_count || 0) * 1
        })).sort((a: any, b: any) => (b.points || 0) - (a.points || 0));
        setTeams(processedTeams);
      }
    } catch (err) {
      console.error('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const response = await fetch('/api/admin/sync-puzzles', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      if (response.ok) {
        alert('Puzzle bank synced successfully!');
      }
    } catch (err) {
      alert('Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistering(true);
    try {
      const response = await fetch('/api/admin/register-team', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ 
          teamId: newTeam.id, 
          teamName: newTeam.name, 
          password: newTeam.password 
        }),
      });
      if (response.ok) {
        setNewTeam({ id: '', name: '', password: '' });
        fetchTeams();
        alert('Team registered!');
      }
    } catch (err) {
      alert('Registration failed');
    } finally {
      setRegistering(false);
    }
  };

  const handleUnban = async (teamId: string) => {
    try {
      const response = await fetch('/api/admin/unban', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ teamId }),
      });
      if (response.ok) {
        fetchTeams();
        alert(`Team ${teamId} unbanned.`);
      }
    } catch (err) {
      alert('Unban failed');
    }
  };

  const handleTimerAction = async (teamId: string, action: 'pause' | 'resume' | 'reset') => {
    try {
      const response = await fetch('/api/admin/team/timer-action', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ teamId, action }),
      });
      if (response.ok) {
        fetchTeams();
        alert(`Timer ${action}d for team ${teamId}.`);
      }
    } catch (err) {
      alert('Action failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#ff3333] animate-spin" />
      </div>
    );
  }

  if (showFullscreenLeaderboard) {
    return (
      <div className="fixed inset-0 bg-[#050505] z-50 p-8 flex flex-col font-mono overflow-hidden">
        <div className="flex justify-between items-center mb-12 border-b border-[#200] pb-6">
          <div className="flex items-center gap-4">
            <Trophy className="w-10 h-10 text-yellow-500" />
            <div>
              <h1 className="text-3xl font-bold uppercase tracking-[0.3em] text-white">Global Leaderboard</h1>
              <p className="text-[#444] text-xs uppercase tracking-widest">Real-time Node Performance Tracking</p>
            </div>
          </div>
          <button 
            onClick={() => setShowFullscreenLeaderboard(false)}
            className="p-3 bg-[#111] border border-[#333] rounded hover:border-[#ff3333] transition-colors"
          >
            <Minimize2 className="w-6 h-6 text-[#444]" />
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 gap-4 overflow-y-auto custom-scrollbar pr-4">
          {teams.map((team, index) => (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              key={team.team_id}
              className={`flex items-center justify-between p-6 rounded-lg border ${
                index === 0 ? 'bg-yellow-500/10 border-yellow-500/50' : 
                index === 1 ? 'bg-slate-400/10 border-slate-400/50' :
                index === 2 ? 'bg-amber-700/10 border-amber-700/50' :
                'bg-[#0a0a0a] border-[#222]'
              }`}
            >
              <div className="flex items-center gap-8">
                <span className={`text-4xl font-black w-16 ${
                  index === 0 ? 'text-yellow-500' : 
                  index === 1 ? 'text-slate-400' :
                  index === 2 ? 'text-amber-700' :
                  'text-[#222]'
                }`}>
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-wider">{team.team_name}</h2>
                  <p className="text-xs text-[#444] font-mono">{team.team_id}</p>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-[10px] uppercase text-[#444] tracking-widest mb-1">Solved</p>
                  <p className="text-xl font-bold text-green-500">{team.solved_count || 0}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-[#444] tracking-widest mb-1">Score</p>
                  <p className="text-5xl font-black text-white">{team.points || 0}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#eee] font-mono p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12 border-b border-[#200] pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#ff3333]/10 rounded flex items-center justify-center border border-[#ff3333]/30">
            <Shield className="w-6 h-6 text-[#ff3333]" />
          </div>
          <div>
            <h1 className="text-xl font-bold uppercase tracking-[0.2em]">Command Center</h1>
            <p className="text-[#444] text-xs uppercase tracking-widest">Root Authority Active</p>
          </div>
        </div>
        <button 
          onClick={logoutAdmin}
          className="flex items-center gap-2 text-[#444] hover:text-[#ff3333] transition-colors text-xs uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4" />
          Terminate Session
        </button>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Column: Stats & Actions */}
        <div className="xl:col-span-1 space-y-8">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-[#444]">System Actions</h3>
            <div className="space-y-4">
              <button 
                onClick={handleSync}
                disabled={syncing}
                className="w-full flex items-center justify-between p-3 bg-[#111] border border-[#333] rounded hover:border-[#ff3333] transition-colors group disabled:opacity-50"
              >
                <span className="text-xs uppercase tracking-wider group-hover:text-[#ff3333]">Sync Puzzle Bank</span>
                {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 text-[#444]" />}
              </button>
              
              <div className="pt-4 border-t border-[#222]">
                <h4 className="text-[10px] uppercase tracking-widest text-[#333] mb-4">Register New Team</h4>
                <form onSubmit={handleRegister} className="space-y-3">
                  <input
                    type="text"
                    placeholder="TEAM_ID"
                    value={newTeam.id}
                    onChange={(e) => setNewTeam({ ...newTeam, id: e.target.value })}
                    className="w-full bg-[#000] border border-[#222] rounded p-2 text-xs focus:border-[#ff3333] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="TEAM_NAME"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    className="w-full bg-[#000] border border-[#222] rounded p-2 text-xs focus:border-[#ff3333] outline-none"
                  />
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    value={newTeam.password}
                    onChange={(e) => setNewTeam({ ...newTeam, password: e.target.value })}
                    className="w-full bg-[#000] border border-[#222] rounded p-2 text-xs focus:border-[#ff3333] outline-none"
                  />
                  <button 
                    type="submit"
                    disabled={registering}
                    className="w-full bg-[#ff3333] text-black font-bold py-2 rounded text-xs uppercase tracking-widest hover:bg-[#ff0000] transition-colors disabled:opacity-50"
                  >
                    {registering ? 'Processing...' : 'Register Node'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-[#444]">Global Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#111] p-4 rounded border border-[#222]">
                <Users className="w-4 h-4 text-[#ff3333] mb-2" />
                <p className="text-[10px] text-[#444] uppercase">Teams</p>
                <p className="text-xl font-bold">{teams.length}</p>
              </div>
              <div className="bg-[#111] p-4 rounded border border-[#222]">
                <Puzzle className="w-4 h-4 text-blue-500 mb-2" />
                <p className="text-[10px] text-[#444] uppercase">Puzzles</p>
                <p className="text-xl font-bold">--</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#444]">Leaderboard</h3>
              <button 
                onClick={() => setShowFullscreenLeaderboard(true)}
                className="p-1.5 bg-[#111] border border-[#333] rounded hover:border-yellow-500 transition-colors"
                title="Fullscreen Leaderboard"
              >
                <Maximize2 className="w-3 h-3 text-yellow-500" />
              </button>
            </div>
            <div className="space-y-3">
              {teams.slice(0, 5).map((team, index) => (
                <div key={team.team_id} className="flex items-center justify-between p-2 bg-[#000] border border-[#111] rounded">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold w-4 ${index === 0 ? 'text-yellow-500' : 'text-[#444]'}`}>
                      {index + 1}
                    </span>
                    <span className="text-[10px] uppercase truncate max-w-[80px]">{team.team_name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-white">{team.points || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Team Management */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden">
            <div className="bg-[#111] px-6 py-4 border-b border-[#222] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#ff3333]" />
                <span className="text-xs uppercase tracking-widest font-bold">Active Nodes</span>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#444]" />
                <input 
                  type="text" 
                  placeholder="FILTER_NODES" 
                  className="bg-[#000] border border-[#222] rounded py-1 pl-7 pr-3 text-[10px] outline-none focus:border-[#ff3333]"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#050505] text-[10px] uppercase tracking-widest text-[#444] border-b border-[#222]">
                    <th className="px-6 py-4 font-normal">Team Node</th>
                    <th className="px-6 py-4 font-normal">Current ID</th>
                    <th className="px-6 py-4 font-normal">Solved</th>
                    <th className="px-6 py-4 font-normal">Incorrect</th>
                    <th className="px-6 py-4 font-normal">Lifelines</th>
                    <th className="px-6 py-4 font-normal">Status</th>
                    <th className="px-6 py-4 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#111]">
                  {teams.map((team) => (
                    <tr key={team.team_id} className="hover:bg-[#111]/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold group-hover:text-[#ff3333] transition-colors">{team.team_name}</span>
                          <span className="text-[10px] text-[#444]">{team.team_id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-[#666]">{team.current_puzzle_id || 'NONE'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-green-500">{team.solved_count || 0}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-red-500">{team.incorrect_count || 0}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-2 h-2 rounded-full ${i < (team.lifeline_remaining ?? 3) ? 'bg-blue-500' : 'bg-[#222]'}`} 
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {team.is_banned ? (
                          <span className="px-2 py-0.5 bg-red-900/20 text-red-500 border border-red-900/50 rounded text-[10px] uppercase tracking-tighter">Banned</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-green-900/20 text-green-500 border border-green-900/50 rounded text-[10px] uppercase tracking-tighter">Active</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {team.is_banned ? (
                            <button 
                              onClick={() => handleUnban(team.team_id)}
                              className="text-[10px] uppercase tracking-widest text-[#ff3333] hover:text-white transition-colors border border-[#ff3333]/30 px-2 py-1 rounded"
                            >
                              Unban Node
                            </button>
                          ) : (
                            <>
                              <button 
                                onClick={() => handleTimerAction(team.team_id, team.session_paused_at ? 'resume' : 'pause')}
                                className={`p-1 rounded border transition-colors ${
                                  team.session_paused_at 
                                    ? 'border-green-500/30 text-green-500 hover:bg-green-500/10' 
                                    : 'border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10'
                                }`}
                                title={team.session_paused_at ? 'Resume Timer' : 'Pause Timer'}
                              >
                                {team.session_paused_at ? <Activity className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              </button>
                              <button 
                                onClick={() => handleTimerAction(team.team_id, 'reset')}
                                className="p-1 rounded border border-blue-500/30 text-blue-500 hover:bg-blue-500/10 transition-colors"
                                title="Reset Timer"
                              >
                                <RefreshCw className="w-3 h-3" />
                              </button>
                              <button className="text-[10px] uppercase tracking-widest text-[#444] hover:text-[#ff3333] transition-colors ml-2">Manage</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Live Feed */}
        <div className="xl:col-span-1 space-y-8">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-lg h-[calc(100vh-200px)] flex flex-col">
            <div className="bg-[#111] px-6 py-4 border-b border-[#222]">
              <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-[#ff3333] rounded-full animate-pulse" />
                Live Telemetry
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {events.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-[#222] space-y-4 opacity-50">
                  <Activity className="w-12 h-12" />
                  <p className="text-[10px] uppercase tracking-[0.3em]">No active signals</p>
                </div>
              )}
              {events.map((event) => (
                <div key={event.id} className="bg-[#111] border-l-2 border-[#ff3333] p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-[8px] uppercase px-1 rounded ${
                      event.type === 'submission' ? 'bg-blue-900/30 text-blue-400' :
                      event.type === 'login' ? 'bg-green-900/30 text-green-400' :
                      'bg-red-900/30 text-red-400'
                    }`}>
                      {event.type}
                    </span>
                    <span className="text-[8px] text-[#333]">{new Date(event.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-[10px] text-[#888] leading-relaxed">{event.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
