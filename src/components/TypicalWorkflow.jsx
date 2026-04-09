import { motion } from 'framer-motion'

function WorkflowDiagram() {
  return (
    <div className="overflow-x-auto">
      <svg viewBox="0 0 680 168" className="w-full min-w-[480px]">
        {/* ── Main branch line ─────────────────────────── */}
        <line x1="0" y1="152" x2="680" y2="152" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />

        {/* Default branch label box */}
        <rect x="4" y="134" width="88" height="32" rx="7" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
        <text x="48" y="147" textAnchor="middle" fontSize="9" fontWeight="700" fill="#15803d" fontFamily="monospace">main</text>
        <text x="48" y="159" textAnchor="middle" fontSize="8" fill="#16a34a" fontFamily="ui-sans-serif,system-ui,sans-serif">(default branch)</text>

        {/* ── Feature branch arc ───────────────────────── */}
        {/* Up curve from branch point to feature line */}
        <path d="M 105 152 C 105 106 140 78 164 78" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Horizontal feature line */}
        <line x1="164" y1="78" x2="587" y2="78" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        {/* Down curve from merge node back to main */}
        <path d="M 623 78 C 645 78 658 106 658 152" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Branch point dot */}
        <circle cx="105" cy="152" r="5" fill="#f59e0b" />

        {/* Merge dot on main */}
        <circle cx="658" cy="152" r="7" fill="#22c55e" stroke="white" strokeWidth="2" />


        {/* ── Step nodes ───────────────────────────────── */}

        {/* 1 — Feature Branch */}
        <rect x="164" y="64" width="114" height="28" rx="7" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
        <text x="221" y="82" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400e" fontFamily="ui-sans-serif,system-ui,sans-serif">Feature Branch</text>
        <circle cx="164" cy="64" r="9" fill="#eab308" />
        <text x="164" y="68" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="ui-sans-serif,system-ui,sans-serif">1</text>

        {/* 2 — Pull Request */}
        <rect x="288" y="64" width="100" height="28" rx="7" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
        <text x="338" y="82" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7e22ce" fontFamily="ui-sans-serif,system-ui,sans-serif">Pull Request</text>
        <circle cx="288" cy="64" r="9" fill="#a855f7" />
        <text x="288" y="68" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="ui-sans-serif,system-ui,sans-serif">2</text>

        {/* dbt CI (no number, special node) */}
        <rect x="398" y="64" width="66" height="28" rx="7" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        <text x="431" y="82" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af" fontFamily="ui-sans-serif,system-ui,sans-serif">dbt CI</text>

        {/* 3 — Peer Review */}
        <rect x="474" y="64" width="100" height="28" rx="7" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="524" y="82" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af" fontFamily="ui-sans-serif,system-ui,sans-serif">Peer Review</text>
        <circle cx="474" cy="64" r="9" fill="#3b82f6" />
        <text x="474" y="68" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="ui-sans-serif,system-ui,sans-serif">3</text>

        {/* 4 — Merge! circle node */}
        <circle cx="605" cy="78" r="20" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="605" y="74" textAnchor="middle" fontSize="8" fontWeight="800" fill="#15803d" fontFamily="ui-sans-serif,system-ui,sans-serif">4</text>
        <text x="605" y="86" textAnchor="middle" fontSize="8" fontWeight="700" fill="#16a34a" fontFamily="ui-sans-serif,system-ui,sans-serif">Merge!</text>

      </svg>
    </div>
  )
}

const STEPS = [
  { num: '1', label: 'Feature Branch', color: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-800', badge: 'bg-yellow-400', desc: 'Create an isolated copy of the codebase to develop in, without touching main.' },
  { num: '2', label: 'Pull Request', color: 'bg-purple-50 border-purple-200', text: 'text-purple-800', badge: 'bg-purple-500', desc: 'Formally propose merging your branch into main. This kicks off automated CI.' },
  { num: 'CI', label: 'dbt CI Job', color: 'bg-blue-50 border-blue-200', text: 'text-blue-800', badge: 'bg-blue-500', desc: 'dbt builds only changed models in an isolated schema, runs tests, and diffs data.' },
  { num: '3', label: 'Peer Review', color: 'bg-blue-50 border-blue-200', text: 'text-blue-800', badge: 'bg-blue-500', desc: "A teammate reviews logic and intent. Automated tests cannot catch business errors." },
  { num: '4', label: 'Merge & Deploy', color: 'bg-green-50 border-green-200', text: 'text-green-800', badge: 'bg-green-500', desc: 'Code merges to main. The next scheduled production job picks up the new code.' },
]

export default function TypicalWorkflow() {
  return (
    <div className="w-full space-y-5">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Typical Development Workflow</h3>
        <p className="text-gray-500 text-sm">Every code change follows this path from a developer's branch to production data.</p>
      </div>

      {/* Diagram */}
      <div className="bg-gray-50/50 border border-gray-200/60 rounded-xl p-5">
        <WorkflowDiagram />
      </div>

      {/* Step cards */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {STEPS.map(s => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className={`border rounded-xl p-3 ${s.color} transition-all duration-200 hover:shadow-sm`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`w-5 h-5 rounded-full ${s.badge} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                {s.num}
              </span>
              <p className={`text-xs font-bold ${s.text}`}>{s.label}</p>
            </div>
            <p className="text-xs text-gray-600 leading-snug">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
