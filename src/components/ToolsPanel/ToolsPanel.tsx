import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import BuiltinUtilsTab from './BuiltinUtilsTab';
import ExternalLinksTab from './ExternalLinksTab';
import { puzzleToolConfig } from '../../config/puzzleToolConfig';

interface ToolsPanelProps {
  puzzleType: string;
  isolatedUrl?: string | null;
}

export default function ToolsPanel({ puzzleType, isolatedUrl }: ToolsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'builtin' | 'external'>('builtin');

  const config = puzzleToolConfig[puzzleType] || { builtinUtils: [], externalLinks: [] };

  const isInspectPuzzle = puzzleType === 'HTML Inspection';

  return (
    <div className="w-full bg-[#111] border border-[#333] rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors"
      >
        <div className="flex items-center gap-3">
          <Settings className={`w-4 h-4 ${isOpen ? 'text-[#00ff00]' : 'text-[#444]'}`} />
          <span className={`text-xs font-bold uppercase tracking-[0.3em] ${isOpen ? 'text-[#00ff00]' : 'text-[#444]'}`}>
            {isOpen ? 'Hide Node Tools' : 'Show Node Tools'}
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-[#444]" /> : <ChevronDown className="w-4 h-4 text-[#444]" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-[#222]"
          >
            <div className="flex border-b border-[#222]">
              <button
                onClick={() => setActiveTab('builtin')}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  activeTab === 'builtin' ? 'bg-[#1a1a1a] text-[#00ff00] border-b-2 border-[#00ff00]' : 'text-[#444] hover:text-[#666]'
                }`}
              >
                Built-In Utils
              </button>
              <button
                onClick={() => setActiveTab('external')}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  activeTab === 'external' ? 'bg-[#1a1a1a] text-[#00ff00] border-b-2 border-[#00ff00]' : 'text-[#444] hover:text-[#666]'
                }`}
              >
                External Tools
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'builtin' ? (
                <BuiltinUtilsTab utils={config.builtinUtils} />
              ) : (
                <ExternalLinksTab 
                  links={config.externalLinks} 
                  isInspectPuzzle={isInspectPuzzle}
                  isolatedUrl={isolatedUrl}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
