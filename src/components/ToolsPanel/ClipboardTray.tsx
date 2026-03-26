import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clipboard, Check } from 'lucide-react';

export default function ClipboardTray() {
  const [history, setHistory] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleCopy = () => {
      navigator.clipboard.readText().then(text => {
        if (text && !history.includes(text)) {
          setHistory(prev => [text, ...prev].slice(0, 5));
        }
      }).catch(() => {
        // Clipboard API might not be available or permission denied
      });
    };

    // We can't easily listen to system clipboard changes without polling or a focus event
    // But we can intercept the 'copy' event within our app
    const handleInternalCopy = () => {
      setTimeout(() => {
        navigator.clipboard.readText().then(text => {
          if (text && !history.includes(text)) {
            setHistory(prev => [text, ...prev].slice(0, 5));
          }
        });
      }, 100);
    };

    document.addEventListener('copy', handleInternalCopy);
    return () => document.removeEventListener('copy', handleInternalCopy);
  }, [history]);

  const copyAgain = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (history.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 space-y-2 max-w-[200px]">
      <div className="flex items-center gap-2 text-[10px] text-[#444] uppercase tracking-widest mb-2">
        <Clipboard className="w-3 h-3" />
        Clipboard History
      </div>
      <AnimatePresence>
        {history.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => copyAgain(item, i)}
            className="w-full p-2 bg-[#111] border border-[#333] rounded text-[10px] text-[#666] truncate text-left hover:border-[#00ff00] hover:text-[#00ff00] transition-all flex items-center justify-between group"
          >
            <span className="truncate">{item}</span>
            {copiedIndex === i ? <Check className="w-3 h-3 text-[#00ff00]" /> : <Clipboard className="w-3 h-3 opacity-0 group-hover:opacity-100" />}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
