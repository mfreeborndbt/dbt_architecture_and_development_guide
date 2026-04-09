import { motion } from 'framer-motion'
import { GitBranch, GitMerge } from 'lucide-react'

export default function GitBranchingFlow() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Git Workflow: Feature Development</h3>
        <p className="text-sm text-gray-600">
          dbt projects use standard Git workflows. Code changes are made on branches, tested in isolation, then merged back to main.
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {[
          { step: 1, title: 'Create Feature Branch', description: 'git checkout -b feature/new-model', icon: GitBranch, color: 'from-blue-50' },
          { step: 2, title: 'Make Changes Locally', description: 'Edit models, run tests, iterate', icon: null, color: 'from-purple-50' },
          { step: 3, title: 'Commit & Push', description: 'git commit -m "Add new customer model"', icon: null, color: 'from-indigo-50' },
          { step: 4, title: 'Create Pull Request', description: 'Open PR on GitHub for review & CI/CD', icon: null, color: 'from-cyan-50' },
          { step: 5, title: 'Code Review & Merge', description: 'Team reviews, tests pass, merge to main', icon: GitMerge, color: 'from-green-50' }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`bg-gradient-to-r ${item.color} to-transparent border-l-4 border-green-500 p-4 rounded-r-lg`}
          >
            <div className="flex items-start gap-4">
              {item.icon && <item.icon className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />}
              <div className={!item.icon ? 'ml-6' : ''}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full">
                    {item.step}
                  </span>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                </div>
                <p className="text-sm text-gray-600 font-mono">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visual Branch Diagram */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 rounded-lg p-8 font-mono text-sm"
      >
        <div className="space-y-2 text-gray-700">
          <div>main:     ●─────●─────●─────●───────●</div>
          <div>           │           │       │</div>
          <div>feature/  │     ●─────●       │</div>
          <div>new-model │    ↑ create    ↑ merge</div>
          <div>           │               pull request</div>
        </div>
      </motion.div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900">
          <span className="font-semibold">Pro Tip:</span> Keep feature branches focused on a single model or related changes. This makes code review easier and reduces merge conflicts.
        </p>
      </div>
    </div>
  )
}
