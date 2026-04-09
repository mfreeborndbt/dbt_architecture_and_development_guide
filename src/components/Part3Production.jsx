import { motion } from 'framer-motion'
import { GitMerge, Zap, TrendingUp, Eye } from 'lucide-react'
import ddPart3Screenshot1 from '../assets/DD Part 3 Screenshot 1.png'

export default function Part3Production() {
  const stages = [
    {
      stage: 1,
      title: 'PR Approved & Merged',
      description: 'Code is merged to the main branch',
      icon: GitMerge,
      color: 'from-green-50 to-emerald-50',
      points: [
        'Team approves the pull request',
        'All CI/CD checks passed',
        'Code merged to main branch',
        'Ready for production deployment'
      ]
    },
    {
      stage: 2,
      title: 'Production Job Triggered',
      description: 'Automatic deployment to production environment',
      icon: Zap,
      color: 'from-blue-50 to-cyan-50',
      points: [
        'dbt Cloud detects merge to main',
        'Production deployment job starts',
        'Full DAG execution in production',
        'All models run in dependency order'
      ]
    },
    {
      stage: 3,
      title: 'Data Built in Production',
      description: 'New tables/views created with production data',
      icon: TrendingUp,
      color: 'from-purple-50 to-pink-50',
      points: [
        'Models build in analytics schema',
        'Uses full production dataset',
        'All tests run on production data',
        'Artifacts generated for monitoring'
      ]
    },
    {
      stage: 4,
      title: 'Live to Dashboards',
      description: 'Users can query new data immediately',
      icon: Eye,
      color: 'from-orange-50 to-red-50',
      points: [
        'Dashboards automatically refresh',
        'BI tools query new tables',
        'ML models get fresh data',
        'Reports show latest insights'
      ]
    }
  ]

  return (
    <section className="section-container py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Part 3: Production Deployment
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          Once code is merged and CI/CD passes, it automatically deploys to production. Your new models go live and power dashboards, reports, and ML models instantly.
        </p>

        {/* Stages */}
        <div className="space-y-6">
          {stages.map((stage, idx) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`bg-gradient-to-r ${stage.color} border-l-4 border-green-500 rounded-r-lg p-8`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left: Content */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <stage.icon className="w-8 h-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900">{stage.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-4">{stage.description}</p>

                  <ul className="space-y-2">
                    {stage.points.map((point, i) => (
                      <li key={i} className="flex gap-3 text-gray-700">
                        <span className="text-green-600 font-bold">→</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Stage Number */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center"
                >
                  <div className="w-32 h-32 rounded-full bg-white border-4 border-green-600 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-green-600">{stage.stage}</div>
                      <div className="text-xs text-gray-600 mt-1">of 4</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-8 border border-gray-300"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Journey Timeline</h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-green-600 to-green-200"></div>

            {/* Timeline Points */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { label: 'Developer\nWrites Code', icon: '💻' },
                { label: 'CI/CD\nTests', icon: '🧪' },
                { label: 'Code Review\nApproved', icon: '✅' },
                { label: 'Live in\nProduction', icon: '🚀' }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="relative z-10 flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-green-600 flex items-center justify-center text-2xl shadow-lg">
                      {item.icon}
                    </div>
                  </div>
                  <p className="text-center text-sm font-semibold text-gray-900 whitespace-pre-wrap">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Visual: Production Deployment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden mt-8"
        >
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-300">
            <h3 className="font-bold text-gray-900">Production Deployment Workflow in dbt Cloud</h3>
          </div>
          <div className="p-6">
            <img
              src={ddPart3Screenshot1}
              alt="dbt Cloud production deployment showing full DAG execution and artifacts"
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-sm text-gray-600 mt-4 text-center italic">
              Production runs execute the full DAG and generate artifacts for monitoring
            </p>
          </div>
        </motion.div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold text-emerald-900 mb-6">Impact of This Workflow</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-emerald-900 mb-2">Reliability ✓</h4>
              <p className="text-sm text-gray-700">
                Every change is tested before production. Bugs are caught early.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-emerald-900 mb-2">Speed ↑</h4>
              <p className="text-sm text-gray-700">
                Automation handles testing & deployment. Humans focus on modeling.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-emerald-900 mb-2">Visibility 👁</h4>
              <p className="text-sm text-gray-700">
                Every change is tracked in Git. Full audit trail for compliance.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
