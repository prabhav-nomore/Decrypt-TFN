export interface ExternalLink {
  name: string;
  url: string;
  desc: string;
}

export interface ToolConfig {
  builtinUtils: string[];
  externalLinks: ExternalLink[];
  isInspectPuzzle?: boolean;
  isolatedUrl?: string | null;
}

export const puzzleToolConfig: Record<string, ToolConfig> = {
  'Cryptography': {
    builtinUtils: ['cipher-decoder', 'freq-analysis'],
    externalLinks: [
      { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef', desc: 'Multi-step encoder/decoder' }
    ]
  },
  'Steganography': {
    builtinUtils: ['image-channel-view', 'exif-viewer'],
    externalLinks: [
      { name: "Aperi'Solve", url: 'https://www.aperisolve.com', desc: 'Online steganography image analysis' },
      { name: 'StegOnline', url: 'https://stegonline.georgeom.net', desc: 'Web-based steganography tool' }
    ]
  },
  'Code Debugging': {
    builtinUtils: ['code-viewer', 'diff-viewer'],
    externalLinks: [
      { name: 'JDoodle', url: 'https://www.jdoodle.com', desc: 'Online compiler and IDE' },
      { name: 'Programiz', url: 'https://www.programiz.com/online-compiler', desc: 'Online code editor' }
    ]
  },
  'Number Theory': {
    builtinUtils: ['base-converter', 'math-calc'],
    externalLinks: [
      { name: 'WolframAlpha', url: 'https://www.wolframalpha.com', desc: 'Computational intelligence engine' }
    ]
  },
  'Networking': {
    builtinUtils: ['base-converter', 'subnet-calc'],
    externalLinks: [
      { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef', desc: 'Multi-step encoder/decoder' }
    ]
  },
  'Logic / Patterns': {
    builtinUtils: ['grid-renderer', 'truth-table'],
    externalLinks: []
  },
  'Encoding / Decoding': {
    builtinUtils: ['encoding-chain', 'base-converter'],
    externalLinks: [
      { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef', desc: 'Multi-step encoder/decoder' }
    ]
  },
  'OSINT': {
    builtinUtils: ['map-embed', 'whois-lookup'],
    externalLinks: [
      { name: 'Google Maps', url: 'https://www.google.com/maps', desc: 'World maps and navigation' },
      { name: 'Reverse Image Search', url: 'https://images.google.com', desc: 'Search by image' },
      { name: 'WHOIS', url: 'https://whois.domaintools.com', desc: 'Domain lookup service' }
    ]
  },
  'Forensics': {
    builtinUtils: ['hex-viewer', 'hash-calc'],
    externalLinks: [
      { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef', desc: 'Multi-step encoder/decoder' },
      { name: 'hexed.it', url: 'https://hexed.it', desc: 'Online hex editor' }
    ]
  },
  'Audio / Spectrogram': {
    builtinUtils: ['audio-player'],
    externalLinks: [
      { name: 'Academo Spectrum Analyzer', url: 'https://academo.org/demos/spectrum-analyzer', desc: 'Online audio spectrogram' }
    ]
  },
  'Binary / Bitwise': {
    builtinUtils: ['bitwise-calc', 'base-converter'],
    externalLinks: [
      { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef', desc: 'Multi-step encoder/decoder' }
    ]
  },
  'Classical Ciphers': {
    builtinUtils: ['cipher-decoder', 'substitution-mapper'],
    externalLinks: [
      { name: 'dcode.fr', url: 'https://www.dcode.fr/en', desc: 'Tools for cryptography and ciphers' }
    ]
  },
  'Mixed / Meta': {
    builtinUtils: ['cipher-decoder', 'base-converter', 'encoding-chain', 'freq-analysis', 'hash-calc'],
    externalLinks: [
      { name: 'CyberChef', url: 'https://gchq.github.io/CyberChef', desc: 'Multi-step encoder/decoder' }
    ]
  },
  'HTML Inspection': {
    builtinUtils: ['encoding-chain', 'base-converter'],
    externalLinks: []
  },
  'Maze / Pathfinding': {
    builtinUtils: ['grid-renderer', 'path-visualizer'],
    externalLinks: []
  }
};
