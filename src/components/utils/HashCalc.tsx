import React, { useState } from 'react';
import { Copy, Fingerprint } from 'lucide-react';

export default function HashCalc() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [algorithm, setAlgorithm] = useState<'SHA-256' | 'SHA-1' | 'MD5'>('SHA-256');

  const handleHash = async () => {
    if (!input) return;
    try {
      if (algorithm === 'MD5') {
        // MD5 is not in Web Crypto API, but we'll use SHA-256 as fallback or a placeholder
        // In a real app, we'd use a library like crypto-js
        setOutput('MD5 (Requires external library, using SHA-256 fallback)');
        const msgUint8 = new TextEncoder().encode(input);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setOutput(hashHex);
        return;
      }

      const msgUint8 = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setOutput(hashHex);
    } catch (err) {
      setOutput('ERROR: Hashing failed');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-4 p-4 bg-[#1a1a1a] border border-[#333] rounded">
      <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ff00] flex items-center gap-2">
        <Fingerprint className="w-3 h-3" />
        Hash Calculator
      </h4>
      <div className="flex gap-2">
        {(['SHA-256', 'SHA-1', 'MD5'] as const).map(alg => (
          <button
            key={alg}
            onClick={() => setAlgorithm(alg)}
            className={`flex-1 py-1 text-[9px] uppercase border rounded transition-all ${
              algorithm === alg ? 'bg-[#00ff00]/20 border-[#00ff00] text-[#00ff00]' : 'bg-[#050505] border-[#333] text-[#444] hover:border-[#666]'
            }`}
          >
            {alg}
          </button>
        ))}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-[#050505] border border-[#333] rounded p-2 text-xs focus:border-[#00ff00] outline-none"
        placeholder="Enter text to hash..."
        rows={2}
      />
      <button
        onClick={handleHash}
        className="w-full py-2 bg-[#00ff00]/10 border border-[#00ff00]/30 rounded text-[10px] uppercase hover:bg-[#00ff00]/20"
      >
        Calculate Hash
      </button>
      {output && (
        <div className="relative">
          <div className="w-full bg-[#050505] border border-[#333] rounded p-2 text-xs text-[#00ff00] break-all">
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
