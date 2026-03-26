import React, { useState } from 'react';
import { Network } from 'lucide-react';

export default function SubnetCalc() {
  const [ip, setIp] = useState('192.168.1.1');
  const [mask, setMask] = useState('24');
  const [result, setResult] = useState<{ network: string, broadcast: string, first: string, last: string, hosts: number } | null>(null);

  const calculate = () => {
    try {
      const parts = ip.split('.').map(Number);
      if (parts.length !== 4 || parts.some(p => p < 0 || p > 255)) throw new Error();
      
      const m = parseInt(mask);
      if (isNaN(m) || m < 0 || m > 32) throw new Error();

      const ipNum = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
      const maskNum = m === 0 ? 0 : (~0 << (32 - m));
      
      const networkNum = ipNum & maskNum;
      const broadcastNum = networkNum | ~maskNum;
      
      const numToIp = (n: number) => [
        (n >>> 24) & 0xff,
        (n >>> 16) & 0xff,
        (n >>> 8) & 0xff,
        n & 0xff
      ].join('.');

      setResult({
        network: numToIp(networkNum),
        broadcast: numToIp(broadcastNum),
        first: numToIp(networkNum + 1),
        last: numToIp(broadcastNum - 1),
        hosts: Math.max(0, Math.pow(2, 32 - m) - 2)
      });
    } catch (err) {
      alert('Invalid IP or Mask');
    }
  };

  return (
    <div className="space-y-4 p-4 bg-[#1a1a1a] border border-[#333] rounded">
      <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ff00] flex items-center gap-2">
        <Network className="w-3 h-3" />
        Subnet Calculator
      </h4>
      <div className="grid grid-cols-3 gap-2">
        <input
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="col-span-2 bg-[#050505] border border-[#333] rounded p-2 text-xs focus:border-[#00ff00] outline-none"
          placeholder="IP Address"
        />
        <input
          value={mask}
          onChange={(e) => setMask(e.target.value)}
          className="bg-[#050505] border border-[#333] rounded p-2 text-xs focus:border-[#00ff00] outline-none"
          placeholder="CIDR"
        />
      </div>
      <button
        onClick={calculate}
        className="w-full py-2 bg-[#00ff00]/10 border border-[#00ff00]/30 rounded text-[10px] uppercase hover:bg-[#00ff00]/20"
      >
        Calculate
      </button>
      {result && (
        <div className="space-y-1 text-[10px] uppercase tracking-tighter">
          <div className="flex justify-between border-b border-[#222] py-1">
            <span className="text-[#444]">Network</span>
            <span className="text-[#00ff00]">{result.network}</span>
          </div>
          <div className="flex justify-between border-b border-[#222] py-1">
            <span className="text-[#444]">Broadcast</span>
            <span className="text-[#00ff00]">{result.broadcast}</span>
          </div>
          <div className="flex justify-between border-b border-[#222] py-1">
            <span className="text-[#444]">Host Range</span>
            <span className="text-[#00ff00]">{result.first} - {result.last}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#444]">Usable Hosts</span>
            <span className="text-[#00ff00]">{result.hosts}</span>
          </div>
        </div>
      )}
    </div>
  );
}
