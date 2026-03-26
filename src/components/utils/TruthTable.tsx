import React, { useState, useMemo } from 'react';
import { Binary } from 'lucide-react';

export default function TruthTable() {
  const [expression, setExpression] = useState('A && B');
  const [variables, setVariables] = useState(['A', 'B']);

  const table = useMemo(() => {
    try {
      const rows: any[] = [];
      const numVars = variables.length;
      const numRows = Math.pow(2, numVars);

      for (let i = 0; i < numRows; i++) {
        const row: Record<string, boolean> = {};
        for (let j = 0; j < numVars; j++) {
          row[variables[j]] = !!(i & (1 << (numVars - 1 - j)));
        }
        
        // Evaluate expression
        // Replace variables with their values
        let evalExpr = expression;
        variables.forEach(v => {
          evalExpr = evalExpr.replace(new RegExp(`\\b${v}\\b`, 'g'), row[v].toString());
        });
        
        // Replace logic operators
        evalExpr = evalExpr.replace(/AND/gi, '&&').replace(/OR/gi, '||').replace(/NOT/gi, '!');
        
        try {
          row['RESULT'] = eval(evalExpr);
        } catch (e) {
          row['RESULT'] = false;
        }
        rows.push(row);
      }
      return rows;
    } catch (err) {
      return [];
    }
  }, [expression, variables]);

  return (
    <div className="space-y-4 p-4 bg-[#1a1a1a] border border-[#333] rounded">
      <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ff00] flex items-center gap-2">
        <Binary className="w-3 h-3" />
        Truth Table Generator
      </h4>
      <div className="space-y-2">
        <input
          value={variables.join(', ')}
          onChange={(e) => setVariables(e.target.value.split(',').map(v => v.trim()).filter(v => v))}
          className="w-full bg-[#050505] border border-[#333] rounded p-2 text-xs focus:border-[#00ff00] outline-none"
          placeholder="Variables (e.g., A, B, C)"
        />
        <input
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          className="w-full bg-[#050505] border border-[#333] rounded p-2 text-xs focus:border-[#00ff00] outline-none"
          placeholder="Expression (e.g., A && B || !C)"
        />
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-[10px] uppercase tracking-tighter border-collapse">
          <thead>
            <tr className="border-b border-[#333]">
              {variables.map(v => <th key={v} className="p-2 text-left text-[#444]">{v}</th>)}
              <th className="p-2 text-left text-[#00ff00]">RES</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, i) => (
              <tr key={i} className="border-b border-[#222] hover:bg-[#050505]">
                {variables.map(v => (
                  <td key={v} className={`p-2 ${row[v] ? 'text-[#00ff00]' : 'text-[#444]'}`}>
                    {row[v] ? '1' : '0'}
                  </td>
                ))}
                <td className={`p-2 font-bold ${row['RESULT'] ? 'text-[#00ff00]' : 'text-[#444]'}`}>
                  {row['RESULT'] ? '1' : '0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
