import React, { useState, useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import { Copy, Check, FileCode2 } from 'lucide-react';

interface CodeBlockProps {
  filename: string;
  code: string;
  role?: 'Server' | 'Client';
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ filename, code, role }) => {
  const [copied, setCopied] = useState(false);

  const highlightedHtml = useMemo(() => {
    try {
      return Prism.highlight(code, Prism.languages.c, 'c');
    } catch {
      return code;
    }
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const lineCount = useMemo(() => code.split('\n').length, [code]);
  const lineNumbers = useMemo(() => Array.from({ length: lineCount }, (_, i) => i + 1), [lineCount]);

  return (
    <div className="rounded-xl border border-neutral-800 bg-[#0d1117] overflow-hidden shadow-2xl transition-all duration-200">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-neutral-800/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
            <FileCode2 className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-sm font-semibold text-neutral-200">{filename}</span>
          </div>
          {role && (
            <span
              className={`text-xs px-2 py-0.5 rounded font-mono font-medium ${
                role === 'Server'
                  ? 'bg-blue-950/60 text-blue-300 border border-blue-800/60'
                  : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
              }`}
            >
              {role}
            </span>
          )}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          aria-label={`Copy ${filename} code`}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all duration-150 cursor-pointer ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-neutral-800/90 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700/60'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>Copied ✓</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content with Line Numbers */}
      <div className="relative flex overflow-x-auto text-[13px] leading-relaxed font-mono">
        {/* Line Numbers column */}
        <div
          aria-hidden="true"
          className="select-none py-4 pl-3 pr-3 text-right text-neutral-600 bg-[#0d1117]/60 border-r border-neutral-800/60 font-mono text-xs tabular-nums shrink-0"
        >
          {lineNumbers.map((num) => (
            <div key={num} className="leading-relaxed">
              {num}
            </div>
          ))}
        </div>

        {/* Code Pre element */}
        <pre className="p-4 flex-1 overflow-x-auto text-neutral-200 font-mono focus:outline-none">
          <code
            className="language-c font-mono"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </pre>
      </div>
    </div>
  );
};
