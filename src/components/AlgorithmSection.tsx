import React, { useState } from 'react';
import { AlgorithmStep } from '../data/experiments';
import { Server, Laptop, Columns2, SquareKanban } from 'lucide-react';

interface AlgorithmSectionProps {
  serverSteps: AlgorithmStep[];
  clientSteps: AlgorithmStep[];
}

export const AlgorithmSection: React.FC<AlgorithmSectionProps> = ({
  serverSteps,
  clientSteps,
}) => {
  const [viewMode, setViewMode] = useState<'tabs' | 'split'>('split');
  const [activeTab, setActiveTab] = useState<'server' | 'client'>('server');

  const renderStepsList = (steps: AlgorithmStep[], role: 'Server' | 'Client') => (
    <div className="space-y-3">
      {steps.map((step) => (
        <div
          key={step.number}
          className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700/80 transition-colors"
        >
          {/* Step Number Badge */}
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-md text-xs font-mono font-bold shrink-0 mt-0.5 ${
              role === 'Server'
                ? 'bg-blue-950 text-blue-400 border border-blue-800/80'
                : 'bg-emerald-950 text-emerald-400 border border-emerald-800/80'
            }`}
          >
            {step.number}
          </div>

          {/* Step Text & Substeps */}
          <div className="flex-1 min-w-0">
            <p className="text-neutral-200 text-sm font-medium leading-relaxed">
              {step.text}
            </p>

            {step.substeps && step.substeps.length > 0 && (
              <ul className="mt-2 space-y-1.5 pl-2 border-l border-neutral-800">
                {step.substeps.map((sub, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-neutral-400 flex items-start gap-2 font-mono"
                  >
                    <span className="text-neutral-600 select-none">↳</span>
                    <span className="leading-normal">{sub}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header controls: Tabs vs Split Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-neutral-800/60">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Algorithm Architecture
          </span>
          <span className="text-xs text-neutral-600">·</span>
          <span className="text-xs text-neutral-500">
            {serverSteps.length} Server steps / {clientSteps.length} Client steps
          </span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800 text-xs">
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              viewMode === 'split'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Side-by-side view"
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Side by Side</span>
          </button>
          <button
            onClick={() => setViewMode('tabs')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              viewMode === 'tabs'
                ? 'bg-neutral-800 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Tabbed view"
          >
            <SquareKanban className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tabbed</span>
          </button>
        </div>
      </div>

      {/* Render depending on view mode */}
      {viewMode === 'split' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Server Side Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-950/30 border border-blue-900/40">
              <Server className="w-4 h-4 text-blue-400" />
              <h4 className="text-sm font-semibold text-blue-200 font-mono">
                Server Side
              </h4>
              <span className="ml-auto text-xs font-mono text-blue-400/80">
                {serverSteps.length} Steps
              </span>
            </div>
            {renderStepsList(serverSteps, 'Server')}
          </div>

          {/* Client Side Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/30 border border-emerald-900/40">
              <Laptop className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-semibold text-emerald-200 font-mono">
                Client Side
              </h4>
              <span className="ml-auto text-xs font-mono text-emerald-400/80">
                {clientSteps.length} Steps
              </span>
            </div>
            {renderStepsList(clientSteps, 'Client')}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Tabs Selector */}
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
            <button
              onClick={() => setActiveTab('server')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono font-medium transition-colors cursor-pointer ${
                activeTab === 'server'
                  ? 'bg-blue-950/80 text-blue-200 border border-blue-700/60'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              <Server className="w-4 h-4 text-blue-400" />
              <span>Server Side ({serverSteps.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('client')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono font-medium transition-colors cursor-pointer ${
                activeTab === 'client'
                  ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-700/60'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              <Laptop className="w-4 h-4 text-emerald-400" />
              <span>Client Side ({clientSteps.length})</span>
            </button>
          </div>

          {/* Active Tab Step List */}
          <div>
            {activeTab === 'server'
              ? renderStepsList(serverSteps, 'Server')
              : renderStepsList(clientSteps, 'Client')}
          </div>
        </div>
      )}
    </div>
  );
};
