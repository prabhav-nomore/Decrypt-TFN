import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export default function CipherDecoder() {
  const [input, setInput] = useState('');
  const [shift, setShift] = useState(0);
  const [output, setOutput] = useState('');

  const decodeCaesar = (text: string, s: number) => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base - s + 26) % 26) + base);
      }
      return char;
    }).join('');
  };

  const handleDecode = () => {
    setOutput(decodeCaesar(input, shift));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-4 p-4 bg-[#1a1a1a] border border-[#333] rounded">
      <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ff00]">Caesar Cipher Decoder</h4>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-[#050505] border border-[#333] rounded p-2 text-xs focus:border-[#00ff00] outline-none"
        placeholder="Enter ciphertext..."
        rows={3}
      />
      <div className="flex items-center gap-4">
        <label className="text-[10px] uppercase text-[#444]">Shift:</label>
        <input
          type="number"
          value={shift}
          onChange={(e) => setShift(parseInt(e.target.value) || 0)}
          className="w-16 bg-[#050505] border border-[#333] rounded p-1 text-xs focus:border-[#00ff00] outline-none"
        />
        <button
          onClick={handleDecode}
          className="px-4 py-1 bg-[#00ff00]/10 border border-[#00ff00]/30 rounded text-[10px] uppercase hover:bg-[#00ff00]/20"
        >
          Decode
        </button>
      </div>
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
