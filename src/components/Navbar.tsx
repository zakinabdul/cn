import React, { useEffect, useState } from 'react';
import { EXPERIMENTS } from '../data/experiments';
import { ArrowUp, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  activeId: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeId }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-neutral-950/90 backdrop-blur-md border-neutral-800/80 shadow-lg shadow-black/40'
          : 'bg-neutral-950/70 backdrop-blur-sm border-neutral-850'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
          {/* Zone 1: Brand Title (Single text element wordmark) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="flex items-center gap-2.5 font-bold tracking-tight text-white hover:text-emerald-400 transition-colors shrink-0 group"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-mono text-sm sm:text-base font-semibold">
              Computer Networks Lab
            </span>
          </a>

          {/* Zone 2: Navigation Links (Exact names from user brief) */}
          <nav
            aria-label="Experiment navigation"
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none"
          >
            {EXPERIMENTS.map((exp) => {
              const isActive = activeId === exp.id;
              return (
                <a
                  key={exp.id}
                  href={`#${exp.id}`}
                  onClick={(e) => scrollToSection(e, exp.id)}
                  className={`relative px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'text-white bg-neutral-800/90 shadow-sm border border-neutral-700/70 font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/80'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive
                          ? exp.protocol === 'TCP'
                            ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]'
                            : 'bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]'
                          : 'bg-neutral-600'
                      }`}
                    />
                    <span>{exp.navTitle}</span>
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Quick Action / Back to top */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <a
              href="#quick-diff"
              className="text-xs font-mono text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-1 px-2.5 py-1.5 rounded-md hover:bg-neutral-900 border border-transparent hover:border-neutral-800"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>TCP vs UDP</span>
            </a>
            {scrolled && (
              <button
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
