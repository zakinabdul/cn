import { useEffect, useState } from 'react';
import { EXPERIMENTS } from './data/experiments';
import { Navbar } from './components/Navbar';
import { ExperimentCard } from './components/ExperimentCard';
import { ProtocolComparison } from './components/ProtocolComparison';
import { Terminal, ShieldCheck, Zap, BookMarked, Cpu, Sparkles } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('program-5');

  // ScrollSpy to highlight active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = EXPERIMENTS.length - 1; i >= 0; i--) {
        const exp = EXPERIMENTS[i];
        const el = document.getElementById(exp.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(exp.id);
          return;
        }
      }
      if (EXPERIMENTS.length > 0) {
        setActiveSection(EXPERIMENTS[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Sticky Top Navbar */}
      <Navbar activeId={activeSection} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* Hero Revision Banner */}
        <div className="relative rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950/80 border border-neutral-800/80 p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Zap className="w-3.5 h-3.5" />
              <span>Exam Revision Portal</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400">Computer Networks Laboratory</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Computer Networks Lab Experiments
            </h1>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
              Concise pre-exam reference guide covering TCP Matrix Type Identification and Concurrent UDP Time Server. Includes complete C source code, step-by-step algorithms, sample terminal I/O, and exact compilation steps.
            </p>

            {/* Quick jump anchor cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <a
                href="#program-5"
                className="group flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 hover:border-blue-700/50 transition-all cursor-pointer shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <span className="font-mono font-bold text-xs">P5</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-blue-400 font-semibold flex items-center gap-1.5">
                    <span>Program 5</span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-neutral-400">TCP Stream</span>
                  </div>
                  <div className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
                    Matrix Type Identification
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5 font-mono">
                    server.c & client.c (Port 8080)
                  </div>
                </div>
              </a>

              <a
                href="#program-8"
                className="group flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 hover:border-emerald-700/50 transition-all cursor-pointer shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <span className="font-mono font-bold text-xs">P8</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span>Program 8</span>
                    <span className="text-neutral-500">·</span>
                    <span className="text-neutral-400">UDP Datagram</span>
                  </div>
                  <div className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
                    Concurrent Time Server
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5 font-mono">
                    timeserver.c & timeclient.c (Port 8080)
                  </div>
                </div>
              </a>
            </div>

            {/* Offline and fast load notes */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-neutral-500">
              <div className="flex items-center gap-1.5 text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero backend dependency · Instant load</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>One-click clipboard copy</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                <span>Linux GCC verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1 & Section 2 Experiments */}
        <div className="space-y-16">
          {EXPERIMENTS.map((exp) => (
            <ExperimentCard key={exp.id} experiment={exp} />
          ))}
        </div>

        {/* High-Yield Exam Protocol Comparison Table */}
        <ProtocolComparison />
      </main>

      {/* Footer strictly meeting prompt specification */}
      <footer className="border-t border-neutral-850 bg-neutral-950/90 py-8 mt-16 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="font-semibold text-neutral-300">Computer Networks Lab</span>
          </div>

          <div className="text-neutral-500">
            Socket Programming in C · TCP (SOCK_STREAM) & UDP (SOCK_DGRAM)
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#program-5"
              className="hover:text-emerald-400 transition-colors"
            >
              Program 5
            </a>
            <span>·</span>
            <a
              href="#program-8"
              className="hover:text-emerald-400 transition-colors"
            >
              Program 8
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
