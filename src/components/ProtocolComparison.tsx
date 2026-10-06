import React from 'react';
import { ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export const ProtocolComparison: React.FC = () => {
  return (
    <section
      id="quick-diff"
      className="scroll-mt-24 rounded-2xl bg-neutral-900/40 border border-neutral-800/90 p-5 sm:p-8 space-y-6"
    >
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
          <h3 className="text-base sm:text-lg font-semibold text-neutral-100 font-mono tracking-wide uppercase">
            Quick Exam Comparison: Program 5 (TCP) vs Program 8 (UDP)
          </h3>
        </div>
        <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
          High-Yield Viva Revision
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 bg-neutral-950/60">
              <th className="py-3 px-4 font-semibold">Aspect</th>
              <th className="py-3 px-4 font-semibold text-blue-300">
                Program 5 (TCP Matrix Type)
              </th>
              <th className="py-3 px-4 font-semibold text-emerald-300">
                Program 8 (UDP Time Server)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/70 text-neutral-300">
            <tr className="hover:bg-neutral-900/30">
              <td className="py-3 px-4 font-semibold text-neutral-400">Socket Type</td>
              <td className="py-3 px-4 text-blue-200">
                <code className="text-xs bg-blue-950/70 text-blue-300 px-1.5 py-0.5 rounded border border-blue-900/60">
                  SOCK_STREAM
                </code>
              </td>
              <td className="py-3 px-4 text-emerald-200">
                <code className="text-xs bg-emerald-950/70 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-900/60">
                  SOCK_DGRAM
                </code>
              </td>
            </tr>

            <tr className="hover:bg-neutral-900/30">
              <td className="py-3 px-4 font-semibold text-neutral-400">Connection Paradigm</td>
              <td className="py-3 px-4">Connection-oriented (virtual circuit with 3-way handshake)</td>
              <td className="py-3 px-4">Connectionless (independent datagrams, stateless)</td>
            </tr>

            <tr className="hover:bg-neutral-900/30">
              <td className="py-3 px-4 font-semibold text-neutral-400">Server Setup Calls</td>
              <td className="py-3 px-4 font-mono text-xs">
                socket() → bind() → listen() → accept()
              </td>
              <td className="py-3 px-4 font-mono text-xs">
                socket() → bind() (no listen / accept needed!)
              </td>
            </tr>

            <tr className="hover:bg-neutral-900/30">
              <td className="py-3 px-4 font-semibold text-neutral-400">Client Setup Calls</td>
              <td className="py-3 px-4 font-mono text-xs">
                socket() → connect()
              </td>
              <td className="py-3 px-4 font-mono text-xs">
                socket() (sends directly without connect)
              </td>
            </tr>

            <tr className="hover:bg-neutral-900/30">
              <td className="py-3 px-4 font-semibold text-neutral-400">Data Transfer APIs</td>
              <td className="py-3 px-4 font-mono text-xs text-blue-300">
                read() / write()
              </td>
              <td className="py-3 px-4 font-mono text-xs text-emerald-300">
                recvfrom() / sendto()
              </td>
            </tr>

            <tr className="hover:bg-neutral-900/30">
              <td className="py-3 px-4 font-semibold text-neutral-400">Concurrent Capability</td>
              <td className="py-3 px-4">
                Sequential in current code (accepts 1 client connection at a time)
              </td>
              <td className="py-3 px-4">
                Inherently concurrent (stateless recvfrom loop serves any client address)
              </td>
            </tr>

            <tr className="hover:bg-neutral-900/30">
              <td className="py-3 px-4 font-semibold text-neutral-400">Execution Order</td>
              <td className="py-3 px-4 text-xs">
                Terminal 1: <code className="text-neutral-200">gcc server.c && ./a.out</code>
                <br />
                Terminal 2: <code className="text-neutral-200">gcc client.c && ./a.out</code>
              </td>
              <td className="py-3 px-4 text-xs">
                Terminal 1: <code className="text-neutral-200">gcc timeserver.c && ./a.out</code>
                <br />
                Terminal 2: <code className="text-neutral-200">gcc timeclient.c && ./a.out</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs font-mono space-y-2">
          <div className="flex items-center gap-2 text-blue-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Matrix Type Evaluation Logic (Server)</span>
          </div>
          <p className="text-neutral-300 leading-relaxed font-sans">
            Initializes <code className="text-blue-300">upper=1, lower=1, diagonal=1</code>.
            If any non-zero element occurs in:
          </p>
          <ul className="list-disc list-inside text-neutral-400 space-y-1">
            <li><code className="text-neutral-300">i &gt; j</code> (below main diagonal) → <code className="text-amber-300">upper = 0</code></li>
            <li><code className="text-neutral-300">i &lt; j</code> (above main diagonal) → <code className="text-amber-300">lower = 0</code></li>
            <li><code className="text-neutral-300">i != j</code> (off-diagonal) → <code className="text-amber-300">diagonal = 0</code></li>
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs font-mono space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Time Server Formatting Logic (Server)</span>
          </div>
          <p className="text-neutral-300 leading-relaxed font-sans">
            Uses C standard library time utilities:
          </p>
          <ul className="list-disc list-inside text-neutral-400 space-y-1">
            <li><code className="text-emerald-300">time(&current_time)</code>: returns calendar time in seconds</li>
            <li><code className="text-emerald-300">ctime(&current_time)</code>: converts to formatted ASCII string (e.g. <em>Thu Jun 18 11:18:36 2026\n</em>)</li>
            <li>Sends back via <code className="text-emerald-300">sendto()</code> with captured <code className="text-neutral-300">client_addr</code> and <code className="text-neutral-300">len</code></li>
          </ul>
        </div>
      </div>
    </section>
  );
};
