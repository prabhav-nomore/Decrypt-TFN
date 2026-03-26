import React from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { ExternalLink } from '../../config/puzzleToolConfig';

interface ExternalLinksTabProps {
  links: ExternalLink[];
  isInspectPuzzle?: boolean;
  isolatedUrl?: string | null;
}

export default function ExternalLinksTab({ links, isInspectPuzzle, isolatedUrl }: ExternalLinksTabProps) {
  return (
    <div className="space-y-4">
      {isInspectPuzzle && isolatedUrl && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-widest text-yellow-500">HTML Inspection Challenge</h4>
            <a
              href={isolatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1 bg-yellow-500 text-black font-bold rounded text-[10px] uppercase hover:bg-yellow-600 transition-all"
            >
              Open Challenge Page
            </a>
          </div>
          <p className="text-[10px] text-yellow-500/70 leading-relaxed uppercase tracking-tighter">
            TIP: Use F12 / DevTools on the opened page to inspect the source code and find the hidden key.
          </p>
        </div>
      )}

      {links.map((link, i) => (
        <div key={i} className="p-4 bg-[#1a1a1a] border border-[#333] rounded flex items-center justify-between group">
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ff00]">{link.name}</h4>
            <p className="text-[10px] text-[#444] uppercase tracking-tighter">{link.desc}</p>
          </div>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#050505] border border-[#333] rounded hover:border-[#00ff00] hover:text-[#00ff00] transition-all"
          >
            <ExternalLinkIcon className="w-4 h-4" />
          </a>
        </div>
      ))}

      {links.length === 0 && !isInspectPuzzle && (
        <div className="p-8 text-center text-[10px] text-[#333] uppercase tracking-[0.2em]">
          No external tools recommended for this node.
        </div>
      )}
    </div>
  );
}
