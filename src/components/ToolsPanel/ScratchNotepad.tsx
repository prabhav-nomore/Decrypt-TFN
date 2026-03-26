import React, { useState, useEffect, useCallback } from 'react';
import { Edit3, Save, Loader2 } from 'lucide-react';
import debounce from 'lodash/debounce';

interface ScratchNotepadProps {
  teamId: string;
  teamToken: string;
}

export default function ScratchNotepad({ teamId, teamToken }: ScratchNotepadProps) {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const fetchNotepad = async () => {
    try {
      const response = await fetch(`/api/team/notepad?teamId=${teamId}`, {
        headers: { 'Authorization': `Bearer ${teamToken}` }
      });
      const data = await response.json();
      if (response.ok) {
        setContent(data.content || '');
      }
    } catch (err) {
      console.error('Failed to fetch notepad');
    }
  };

  const saveNotepad = useCallback(
    debounce(async (newContent: string) => {
      setSaving(true);
      try {
        const response = await fetch('/api/team/notepad', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${teamToken}`
          },
          body: JSON.stringify({ teamId, content: newContent }),
        });
        if (response.ok) {
          setLastSaved(new Date());
        }
      } catch (err) {
        console.error('Failed to save notepad');
      } finally {
        setSaving(false);
      }
    }, 500),
    [teamId, teamToken]
  );

  useEffect(() => {
    fetchNotepad();
  }, [teamId, teamToken]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    saveNotepad(newContent);
  };

  return (
    <div className="bg-[#111] border border-[#333] rounded-lg overflow-hidden h-full flex flex-col">
      <div className="bg-[#1a1a1a] px-6 py-3 border-b border-[#333] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Edit3 className="w-4 h-4 text-[#00ff00]" />
          <span className="text-xs uppercase tracking-widest font-bold">Scratch Notepad</span>
        </div>
        <div className="flex items-center gap-2 text-[#444]">
          {saving ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Save className="w-3 h-3" />
          )}
          <span className="text-[10px] uppercase tracking-tighter">
            {saving ? 'Saving...' : lastSaved ? `Last Saved: ${lastSaved.toLocaleTimeString()}` : 'Ready'}
          </span>
        </div>
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        className="flex-1 w-full bg-[#050505] p-6 text-xs font-mono text-[#00ff00]/70 leading-relaxed focus:outline-none resize-none custom-scrollbar"
        placeholder="Type your notes, intermediate steps, or decryption keys here..."
      />
    </div>
  );
}
