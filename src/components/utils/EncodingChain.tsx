import React, { useState } from 'react';
import { Copy, ArrowRight } from 'lucide-react';

export default function EncodingChain() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'b64-enc' | 'b64-dec' | 'url-enc' | 'url-dec' | 'html-enc' | 'html-dec'>('b64-enc');

  const handleProcess = () => {
    try {
      switch (mode) {
        case 'b64-enc': setOutput(btoa(input)); break;
        case 'b64-dec': setOutput(atob(input)); break;
        case 'url-enc': setOutput(encodeURIComponent(input)); break;
        case 'url-dec': setOutput(decodeURIComponent(input)); break;
        case 'html-enc': {
          const div = document.createElement('div');
          div.textContent = input;
          setOutput(div.innerHTML);
          break;
        }
        case 'html-dec': {
          const div = document.createElement('div');
          div.innerHTML = input;
          setOutput(div.textContent || '');
          break;
        }
      }
    } catch (err) {
      setOutput('ERROR: Invalid input for selected mode');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-4 p-4 bg-[#1a1a1a] border border-[#333] rounded">
      <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ff00]">Encoding Chain</h4>
      <div className="grid grid-cols-2 gap-2">
        {(['b64-enc', 'b64-dec', 'url-enc', 'url-dec', 'html-enc', 'html-dec'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`py-1 text-[9px] uppercase border rounded transition-all ${
              mode === m ? 'bg-[#00ff00]/20 border-[#00ff00] text-[#00ff00]' : 'bg-[#050505] border-[#333] text-[#444] hover:border-[#666]'
            }`}
          >
            {m.replace('-', ' ')}
          </button>
        ))}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-[#050505] border border-[#333] rounded p-2 text-xs focus:border-[#00ff00] outline-none"
        placeholder="Enter text..."
        rows={2}
      />
      <button
        onClick={handleProcess}
        className="w-full py-2 bg-[#00ff00]/10 border border-[#00ff00]/30 rounded text-[10px] uppercase hover:bg-[#00ff00]/20 flex items-center justify-center gap-2"
      >
        Process <ArrowRight className="w-3 h-3" />
      </button>
      {output && (
        <div className="relative">
          <div className="w-full bg-[#050505] border border-[#333] rounded p-2 text-xs text-[#00ff00] break-all max-h-[100px] overflow-y-auto custom-scrollbar">
            {output}
          </div>
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-2 p-1 hover:text-[#00ff00] transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
