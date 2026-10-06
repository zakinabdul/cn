import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

interface TerminalBoxProps {
  label: string;
  role?: 'Server' | 'Client';
  content: string;
}

export const TerminalBox: React.FC<TerminalBoxProps> = ({ label, role, content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy terminal output: ', err);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#080a0f] shadow-2xl transition-all duration-200">
      {/* Window Title Bar with 3 Colored Window Dots */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#121620] border-b border-neutral-800/80 select-none">
        <div className="flex items-center gap-3">
          {/* Three coloured window dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
          </div>

          <div className="flex items-center gap-2 pl-2">
            <Terminal className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-mono text-xs font-semibold text-neutral-200 tracking-tight">
              {label}
            </span>
          </div>

          {role && (
            <span
              className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded font-semibold tracking-wider ${
                role === 'Server'
                  ? 'bg-blue-900/40 text-blue-300 border border-blue-700/40'
                  : 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/40'
              }`}
            >
              {role}
            </span>
          )}
        </div>

        {/* Copy Output Button */}
        <button
          onClick={handleCopy}
          aria-label={`Copy output of ${label}`}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
            copied
              ? 'bg-emerald-600 text-white font-medium'
              : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/80 border border-neutral-700/50'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-white" />
              <span>Copied ✓</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Output</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Body with Pure Black Background and Vivid Green Text */}
      <div className="p-4 sm:p-5 font-mono text-[13px] leading-relaxed overflow-x-auto text-emerald-400 select-text">
        <pre className="font-mono whitespace-pre text-emerald-400 font-medium">
          {content}
        </pre>
      </div>
    </div>
  );
};
