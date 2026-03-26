import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, Sliders } from 'lucide-react';

export default function ImageChannelView() {
  const [image, setImage] = useState<string | null>(null);
  const [channel, setChannel] = useState<'R' | 'G' | 'B' | 'ALL'>('ALL');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        if (channel === 'R') {
          data[i + 1] = 0;
          data[i + 2] = 0;
        } else if (channel === 'G') {
          data[i] = 0;
          data[i + 2] = 0;
        } else if (channel === 'B') {
          data[i] = 0;
          data[i + 1] = 0;
        }
        
        // Apply brightness/contrast
        // Simple linear approximation
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        for (let j = 0; j < 3; j++) {
          let val = data[i + j];
          val = factor * (val - 128) + 128;
          val = val * (brightness / 100);
          data[i + j] = Math.min(255, Math.max(0, val));
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };
    img.src = image;
  }, [image, channel, brightness, contrast]);

  return (
    <div className="space-y-4 p-4 bg-[#1a1a1a] border border-[#333] rounded">
      <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ff00] flex items-center gap-2">
        <ImageIcon className="w-3 h-3" />
        Channel Isolator
      </h4>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full bg-[#050505] border border-[#333] rounded p-2 text-[10px] text-[#444] focus:border-[#00ff00] outline-none"
      />
      <div className="grid grid-cols-4 gap-2">
        {(['ALL', 'R', 'G', 'B'] as const).map(c => (
          <button
            key={c}
            onClick={() => setChannel(c)}
            className={`py-1 text-[9px] uppercase border rounded transition-all ${
              channel === c ? 'bg-[#00ff00]/20 border-[#00ff00] text-[#00ff00]' : 'bg-[#050505] border-[#333] text-[#444] hover:border-[#666]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[10px] uppercase text-[#444]">Brightness</label>
          <span className="text-[10px] text-[#00ff00]">{brightness}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          value={brightness}
          onChange={(e) => setBrightness(parseInt(e.target.value))}
          className="w-full h-1 bg-[#050505] rounded-full appearance-none accent-[#00ff00]"
        />
        <div className="flex items-center justify-between">
          <label className="text-[10px] uppercase text-[#444]">Contrast</label>
          <span className="text-[10px] text-[#00ff00]">{contrast}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          value={contrast}
          onChange={(e) => setContrast(parseInt(e.target.value))}
          className="w-full h-1 bg-[#050505] rounded-full appearance-none accent-[#00ff00]"
        />
      </div>
      {image && (
        <div className="border border-[#333] rounded overflow-hidden bg-[#050505]">
          <canvas ref={canvasRef} className="w-full h-auto" />
        </div>
      )}
    </div>
  );
}
