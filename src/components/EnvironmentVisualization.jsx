import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, Settings, ArrowDown } from 'lucide-react'
import prereqConcept2 from '../assets/Prereq Concept 2.png'

const environments = [
  {
    name: 'Development',
    type: 'dev',
    schemaName: 'dbt_[userlastname]',
    schemaExample: 'dbt_jsmith, dbt_mbrown',
    color: 'from-blue-50 to-blue-100 border-blue-300',
    textColor: 'text-blue-900',
    bgColor: 'bg-blue-50',
    purpose: 'Personal development sandbox',
    features: [
      'Your own personal schema',
      'Isolated from all other developers',
      'Fast iterative development',
      'Used in dbt Studio IDE',
      'Perfect for experimenting'
    ],
    credentials: 'Your dev credentials',
    database: 'dev_db or analytics_dev'
  },
  {
    name: 'QA/Testing',
    type: 'qa',
    schemaName: 'PR_[PR_NUMBER]',
    schemaExample: 'PR_1234, PR_5678',
    color: 'from-amber-50 to-amber-100 border-amber-300',
    textColor: 'text-amber-900',
    bgColor: 'bg-amber-50',
    purpose: 'Automated CI/CD testing environment',
    features: [
      'Created automatically for each PR',
      'Isolated test environment',
      'Runs all automated tests',
      'Data diffing & validation',
      'Auto-cleaned up after merge'
    ],
    credentials: 'CI/CD service account',
    database: 'analytics or dev_db'
  },
  {
    name: 'Production',
    type: 'prod',
    schemaName: 'analytics',
    schemaExample: 'analytics',
    color: 'from-green-50 to-green-100 border-green-300',
    textColor: 'text-green-900',
    bgColor: 'bg-green-50',
    purpose: 'Official source of truth',
    features: [
      'Only tested, approved code',
      'Full production dataset',
      'Used by dashboards & ML',
      'Governed & monitored',
      'Audit trail for compliance'
    ],
    credentials: 'Production service account',
    database: 'analytics'
  }
]

export default function EnvironmentVisualization() {
  const [selectedEnv, setSelectedEnv] = useState('dev')

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Environments: Three Tiers of Isolation</h3>
        <p className="text-gray-600">
          By filling out a simple form in dbt Cloud, you create an entire environment. Each environment is isolated with its own schema, credentials, and purpose.
        </p>
      </div>

      {/* Three Environment Boxes with Flow */}
      <div className="space-y-4">
        {environments.map((env, idx) => (
          <div key={env.type}>
            <motion.button
              onClick={() => setSelectedEnv(env.type)}
              whileHover={{ scale: 1.01 }}
              className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                selectedEnv === env.type
                  ? `${env.color} border-2 shadow-lg`
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Database className={`w-6 h-6 ${env.textColor}`} />
                    <h4 className={`text-xl font-bold ${env.textColor}`}>{env.name}</h4>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold opacity-70">Schema Name:</p>
                      <p className="font-mono font-bold">{env.schemaName}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold opacity-70">Example:</p>
                      <p className="font-mono text-sm">{env.schemaExample}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs font-semibold opacity-70">
                  {selectedEnv === env.type ? '▼' : '▶'}
                </div>
              </div>
            </motion.button>

            {/* Expanded Details */}
            {selectedEnv === env.type && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`${env.bgColor} border-2 ${env.color.split(' ')[0]} border-t-0 rounded-b-lg p-8`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left: Purpose & Features */}
                  <div>
                    <h5 className={`text-lg font-bold ${env.textColor} mb-4`}>Purpose</h5>
                    <p className={`${env.textColor} mb-6 font-semibold`}>{env.purpose}</p>

                    <h5 className={`text-lg font-bold ${env.textColor} mb-4`}>Key Features</h5>
                    <ul className="space-y-2">
                      {env.features.map((feature, i) => (
                        <li key={i} className={`flex gap-3 text-sm ${env.textColor}`}>
                          <span className="font-bold">→</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Configuration */}
                  <div className={`${env.bgColor} border-2 ${env.color.split(' ')[0]} rounded-lg p-6`}>
                    <h5 className={`text-lg font-bold ${env.textColor} mb-4`}>Configuration</h5>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className={`text-xs font-bold ${env.textColor} opacity-70 mb-1`}>Database</p>
                        <p className="font-mono bg-white bg-opacity-50 px-3 py-2 rounded">
                          {env.database}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${env.textColor} opacity-70 mb-1`}>Schema</p>
                        <p className="font-mono bg-white bg-opacity-50 px-3 py-2 rounded">
                          {env.schemaName}
                        </p>
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${env.textColor} opacity-70 mb-1`}>Credentials</p>
                        <p className="font-mono bg-white bg-opacity-50 px-3 py-2 rounded">
                          {env.credentials}
                        </p>
                      </div>
                      <div className="pt-2 border-t-2 opacity-70">
                        <p className="text-xs italic">Click to configure in dbt Cloud</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Arrow between environments */}
            {idx < environments.length - 1 && (
              <div className="flex justify-center py-2">
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-gray-400"
                >
                  <ArrowDown className="w-6 h-6" />
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Visual Configuration Form Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden"
      >
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-300">
          <h3 className="font-bold text-gray-900">dbt Cloud Environment Configuration</h3>
          <p className="text-sm text-gray-600">This is what you actually fill out</p>
        </div>

        <div className="p-8">
          <img
            src={prereqConcept2}
            alt="Environment configuration example from dbt Cloud"
            className="w-full rounded-lg shadow-lg"
          />
          <p className="text-sm text-gray-600 mt-4 text-center italic">
            Screenshot shows actual dbt Cloud environment configuration form with fields for environment name, type, credentials, and target
          </p>
        </div>
      </motion.div>

      {/* How They Work Together */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-8"
      >
        <h4 className="text-lg font-bold text-purple-900 mb-6">How These Environments Work Together</h4>

        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <p className="font-semibold text-purple-900">Developer works in DEV</p>
              <p className="text-sm text-purple-800">Uses their personal schema (dbt_jsmith) with their own credentials. Full control to experiment.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <p className="font-semibold text-purple-900">PR opens in QA</p>
              <p className="text-sm text-purple-800">Automated QA environment spins up (PR_1234). All tests run in isolation. Nothing touches production.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <p className="font-semibold text-purple-900">Code ships to PROD</p>
              <p className="text-sm text-purple-800">Once approved, code runs in production schema (analytics). Only tested, approved code gets here.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white border border-purple-200 rounded">
          <p className="text-sm text-purple-900">
            <span className="font-bold">Key Insight:</span> All three environments are defined the exact same way—just different configurations. The same dbt code runs in all three, but with different data and schemas.
          </p>
        </div>
      </motion.div>

      {/* Environment Parameters Explained */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-gray-50 border-2 border-gray-300 rounded-lg p-8"
      >
        <h4 className="text-lg font-bold text-gray-900 mb-6">Understanding Environment Parameters</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-600" />
              Environment Name
            </h5>
            <p className="text-sm text-gray-700 mb-2">
              Identifies your environment type
            </p>
            <p className="font-mono text-xs bg-gray-100 p-2 rounded">dev | qa | prod</p>
            <p className="text-xs text-gray-600 mt-2">Used in dbt commands: <code>dbt run --target dev</code></p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4 text-green-600" />
              Environment Target
            </h5>
            <p className="text-sm text-gray-700 mb-2">
              Where dbt writes data
            </p>
            <p className="font-mono text-xs bg-gray-100 p-2 rounded">database.schema</p>
            <p className="text-xs text-gray-600 mt-2">Example: <code>analytics.dbt_jsmith</code></p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4 text-purple-600" />
              Credentials
            </h5>
            <p className="text-sm text-gray-700 mb-2">
              How to access the warehouse
            </p>
            <p className="font-mono text-xs bg-gray-100 p-2 rounded">username, key, permissions</p>
            <p className="text-xs text-gray-600 mt-2">Different per environment for security</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4 text-orange-600" />
              dbt Version
            </h5>
            <p className="text-sm text-gray-700 mb-2">
              Which version of dbt to use
            </p>
            <p className="font-mono text-xs bg-gray-100 p-2 rounded">1.5, 1.6, Latest</p>
            <p className="text-xs text-gray-600 mt-2">Can differ between environments</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
