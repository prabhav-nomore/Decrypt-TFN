import React from 'react';
import CipherDecoder from '../utils/CipherDecoder';
import BaseConverter from '../utils/BaseConverter';
import EncodingChain from '../utils/EncodingChain';
import FrequencyAnalyzer from '../utils/FrequencyAnalyzer';
import HashCalc from '../utils/HashCalc';
import ImageChannelView from '../utils/ImageChannelView';
import HexViewer from '../utils/HexViewer';
import SubnetCalc from '../utils/SubnetCalc';
import TruthTable from '../utils/TruthTable';

interface BuiltinUtilsTabProps {
  utils: string[];
}

export default function BuiltinUtilsTab({ utils }: BuiltinUtilsTabProps) {
  const renderUtil = (util: string) => {
    switch (util) {
      case 'cipher-decoder':
        return <CipherDecoder key={util} />;
      case 'base-converter':
        return <BaseConverter key={util} />;
      case 'encoding-chain':
        return <EncodingChain key={util} />;
      case 'freq-analysis':
        return <FrequencyAnalyzer key={util} />;
      case 'hash-calc':
        return <HashCalc key={util} />;
      case 'image-channel-view':
        return <ImageChannelView key={util} />;
      case 'hex-viewer':
        return <HexViewer key={util} />;
      case 'subnet-calc':
        return <SubnetCalc key={util} />;
      case 'truth-table':
        return <TruthTable key={util} />;
      // Add more cases as more utils are implemented
      default:
        return (
          <div key={util} className="p-4 bg-[#1a1a1a] border border-[#333] rounded text-[10px] text-[#444] uppercase tracking-widest">
            {util} (In Development)
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      {utils.map(renderUtil)}
    </div>
  );
}
