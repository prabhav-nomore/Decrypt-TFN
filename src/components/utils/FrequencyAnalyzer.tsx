import React, { useState, useMemo } from 'react';
import { BarChart3 } from 'lucide-react';

export default function FrequencyAnalyzer() {
  const [input, setInput] = useState('');

  const freqData = useMemo(() => {
    const counts: Record<string, number> = {};
    const cleanInput = input.toUpperCase().replace(/[^A-Z]/g, '');
    if (!cleanInput) return [];

    for (const char of cleanInput) {
      counts[char] = (counts[char] || 0) + 1;
    }

    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const max = Math.max(...sorted.map(s => s[1]));
    return sorted.map(([char, count]) => ({
      char,
      count,
      percent: (count / max) * 100
    }));
  }, [input]);

  return (
    <div className="space-y-4 p-4 bg-[#1a1a1a] border border-[#333] rounded">
      <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ff00] flex items-center gap-2">
        <BarChart3 className="w-3 h-3" />
        Frequency Analysis
      </h4>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-[#050505] border border-[#333] rounded p-2 text-xs focus:border-[#00ff00] outline-none"
        placeholder="Paste ciphertext for analysis..."
        rows={3}
      />
      <div className="space-y-2">
        {freqData.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs font-bold w-4">{d.char}</span>
            <div className="flex-1 h-2 bg-[#050505] rounded-full overflow-hidden border border-[#222]">
              <div
                className="h-full bg-[#00ff00]/50"
                style={{ width: `${d.percent}%` }}
              />
            </div>
            <span className="text-[10px] text-[#444] w-8">{d.count}</span>
          </div>
        ))}
        {input && freqData.length === 0 && (
          <p className="text-[10px] text-[#444] text-center uppercase">No letters found</p>
        )}
      </div>
    </div>
  );
}
