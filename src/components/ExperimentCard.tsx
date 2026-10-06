import React, { useState } from 'react';
import { ExperimentData } from '../data/experiments';
import { CodeBlock } from './CodeBlock';
import { TerminalBox } from './TerminalBox';
import { AlgorithmSection } from './AlgorithmSection';
import {
  Copy,
  Check,
  Target,
  ListOrdered,
  Code2,
  Terminal,
  Award,
  Info,
  Network
} from 'lucide-react';

interface ExperimentCardProps {
  experiment: ExperimentData;
}

export const ExperimentCard: React.FC<ExperimentCardProps> = ({ experiment }) => {
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAll = async () => {
    try {
      const combined = experiment.files
        .map(
          (f) =>
            `/* ========================================================================\n   FILE: ${f.filename} (${f.role} Program)\n   ======================================================================== */\n\n${f.code}`
        )
        .join('\n\n\n');

      await navigator.clipboard.writeText(combined);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error('Failed to copy all code: ', err);
    }
  };

  return (
    <section
      id={experiment.id}
      className="scroll-mt-24 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-5 sm:p-8 md:p-10 space-y-10 shadow-xl backdrop-blur-sm"
    >
      {/* Experiment Header */}
      <div className="space-y-3 pb-6 border-b border-neutral-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span
              className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[11px] ${
                experiment.protocol === 'TCP'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {experiment.protocol} Protocol
            </span>
            <span aria-hidden="true">·</span>
            <span>Program {experiment.number}</span>
            <span aria-hidden="true">·</span>
            <span>Port 8080</span>
          </div>

          {/* Copy All Code Button */}
          <button
            onClick={handleCopyAll}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-150 cursor-pointer ${
              copiedAll
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white border border-neutral-700/80'
            }`}
            title="Copy both server and client files together"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>All Code Copied ✓</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy all code ({experiment.files.map((f) => f.filename).join(' + ')})</span>
              </>
            )}
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
          {experiment.title}
        </h2>
      </div>

      {/* 1. AIM */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-400" />
          <h3 className="text-base sm:text-lg font-semibold text-neutral-100 font-mono tracking-wide uppercase">
            Aim
          </h3>
        </div>
        <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/70 border border-neutral-800 text-neutral-200 leading-relaxed text-sm sm:text-base">
          {experiment.aim}
        </div>
      </div>

      {/* 2. ALGORITHM */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-4 h-4 text-emerald-400" />
          <h3 className="text-base sm:text-lg font-semibold text-neutral-100 font-mono tracking-wide uppercase">
            Algorithm
          </h3>
        </div>
        <AlgorithmSection
          serverSteps={experiment.algorithm.server}
          clientSteps={experiment.algorithm.client}
        />
      </div>

      {/* 3. PROGRAM */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-semibold text-neutral-100 font-mono tracking-wide uppercase">
              Program
            </h3>
            <span className="text-xs text-neutral-500 font-mono">
              ({experiment.files.length} C source files)
            </span>
          </div>

          <button
            onClick={handleCopyAll}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer ${
              copiedAll
                ? 'bg-emerald-600 text-white'
                : 'text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700'
            }`}
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied Both Files ✓</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy All Code</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {experiment.files.map((file) => (
            <CodeBlock
              key={file.filename}
              filename={file.filename}
              role={file.role}
              code={file.code}
            />
          ))}
        </div>
      </div>

      {/* 4. OUTPUT */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="text-base sm:text-lg font-semibold text-neutral-100 font-mono tracking-wide uppercase">
            Output
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {experiment.terminals.map((term) => (
            <TerminalBox
              key={term.label}
              label={term.label}
              role={term.role}
              content={term.content}
            />
          ))}
        </div>

        {/* How to run note */}
        <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200/90 text-xs sm:text-sm">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300 font-mono">How to run: </span>
            <span>{experiment.howToRunNote}</span>
          </div>
        </div>
      </div>

      {/* 5. RESULT */}
      {experiment.result && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-semibold text-neutral-100 font-mono tracking-wide uppercase">
              Result
            </h3>
          </div>
          <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-200/95 leading-relaxed text-sm sm:text-base font-normal">
            {experiment.result}
          </div>
        </div>
      )}

      {/* Quick Revision Notes for Exams */}
      {experiment.quickReview && (
        <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <Network className="w-3.5 h-3.5 text-blue-400" />
            <span>Viva / Quick Revision Digest</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
              <span className="text-neutral-500 block mb-1">Socket Type</span>
              <span className="text-neutral-200 font-semibold">{experiment.quickReview.socketType}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800">
              <span className="text-neutral-500 block mb-1">Port</span>
              <span className="text-neutral-200 font-semibold">{experiment.quickReview.port}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800 col-span-1 sm:col-span-2">
              <span className="text-neutral-500 block mb-1">Key Functions</span>
              <span className="text-emerald-400">{experiment.quickReview.functionsUsed.join(' · ')}</span>
            </div>
          </div>

          <div className="text-xs text-neutral-400 leading-relaxed font-mono pt-1">
            <span className="text-neutral-300 font-medium">Core Mechanism: </span>
            {experiment.quickReview.keyConcept}
          </div>
        </div>
      )}
    </section>
  );
};
