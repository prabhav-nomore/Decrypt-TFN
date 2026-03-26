import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export default function BaseConverter() {
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(16);
  const [output, setOutput] = useState('');

  const handleConvert = () => {
    try {
      const decimal = parseInt(input, fromBase);
      if (isNaN(decimal)) throw new Error('Invalid input');
      setOutput(decimal.toString(toBase).toUpperCase());
    } catch (err) {
      setOutput('ERROR: Invalid input for base ' + fromBase);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-4 p-4 bg-[#1a1a1a] border border-[#333] rounded">
      <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ff00]">Base Converter</h4>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-[10px] uppercase text-[#444] block mb-1">From Base:</label>
          <select
            value={fromBase}
            onChange={(e) => setFromBase(parseInt(e.target.value))}
            className="w-full bg-[#050505] border border-[#333] rounded p-2 text-xs focus:border-[#00ff00] outline-none"
          >
            <option value={2}>Binary (2)</option>
            <option value={8}>Octal (8)</option>
            <option value={10}>Decimal (10)</option>
            <option value={16}>Hex (16)</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="text-[10px] uppercase text-[#444] block mb-1">To Base:</label>
          <select
            value={toBase}
            onChange={(e) => setToBase(parseInt(e.target.value))}
            className="w-full bg-[#050505] border border-[#333] rounded p-2 text-xs focus:border-[#00ff00] outline-none"
          >
            <option value={2}>Binary (2)</option>
            <option value={8}>Octal (8)</option>
            <option value={10}>Decimal (10)</option>
            <option value={16}>Hex (16)</option>
          </select>
        </div>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-[#050505] border border-[#333] rounded p-2 text-xs focus:border-[#00ff00] outline-none"
        placeholder="Enter value..."
      />
      <button
        onClick={handleConvert}
        className="w-full py-2 bg-[#00ff00]/10 border border-[#00ff00]/30 rounded text-[10px] uppercase hover:bg-[#00ff00]/20"
      >
        Convert
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
