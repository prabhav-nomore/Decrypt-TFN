import React, { useState } from 'react';
import { FileCode, Search } from 'lucide-react';

export default function HexViewer() {
  const [hexData, setHexData] = useState<string[]>([]);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => {
        const buffer = ev.target?.result as ArrayBuffer;
        const view = new Uint8Array(buffer);
        const hexLines: string[] = [];
        for (let i = 0; i < view.length; i += 16) {
          const chunk = view.slice(i, i + 16);
          const hex = Array.from(chunk).map(b => b.toString(16).padStart(2, '0').toUpperCase()).join(' ');
          const ascii = Array.from(chunk).map(b => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.')).join('');
          const offset = i.toString(16).padStart(8, '0').toUpperCase();
          hexLines.push(`${offset} | ${hex.padEnd(47)} | ${ascii}`);
        }
        setHexData(hexLines.slice(0, 100)); // Limit to first 100 lines for performance
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-[#1a1a1a] border border-[#333] rounded">
      <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ff00] flex items-center gap-2">
        <FileCode className="w-3 h-3" />
        Hex Viewer
      </h4>
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full bg-[#050505] border border-[#333] rounded p-2 text-[10px] text-[#444] focus:border-[#00ff00] outline-none"
      />
      {fileName && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] text-[#444] uppercase tracking-tighter">
            <span>File: {fileName}</span>
            <span>Showing first 100 lines</span>
          </div>
          <div className="w-full bg-[#050505] border border-[#333] rounded p-2 text-[10px] font-mono text-[#00ff00]/70 whitespace-pre overflow-x-auto custom-scrollbar max-h-[200px]">
            {hexData.join('\n')}
          </div>
        </div>
      )}
    </div>
  );
}
