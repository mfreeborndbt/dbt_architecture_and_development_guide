import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Database, BarChart3 } from 'lucide-react'
import ddPart2Screenshot1 from '../assets/DD Part 2 Screenshot 1.png'

export default function Part2CICD() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    {
      id: 1,
      title: 'PR Created & Tests Start',
      description: 'When you push code, CI/CD automatically triggers',
      details: [
        'Pull request opened on GitHub',
        'dbt Cloud detects the PR',
        'Automated CI/CD job starts immediately'
      ]
    },
    {
      id: 2,
      title: 'Create Isolated Schema',
      description: 'Code runs in a temporary, isolated schema',
      details: [
        'New schema created: PR_1234',
        'Prevents overwriting production or other PR tests',
        'Automatic cleanup after PR is merged or closed'
      ]
    },
    {
      id: 3,
      title: 'Run Changed Models Only',
      description: 'Only affected models are executed',
      details: [
        'dbt detects which models were changed',
        'Only runs changed models and their downstream dependencies',
        'Faster feedback than running everything',
        'Can defer to production for unchanged upstream'
      ]
    },
    {
      id: 4,
      title: 'Run Tests Automatically',
      description: 'Data quality tests validate your changes',
      details: [
        'All defined tests execute',
        'Checks for not-null, uniqueness, referential integrity',
        'Custom tests catch business logic errors',
        'Fails the PR if any test fails'
      ]
    },
    {
      id: 5,
      title: 'Data Diffing',
      description: 'Compare before/after data',
      details: [
        'Shows row counts for added/removed/modified records',
        'Identifies unexpected data changes',
        'Helps catch subtle bugs that tests might miss'
      ]
    },
    {
      id: 6,
      title: 'Code Review & Merge',
      description: 'Human review before production',
      details: [
        'Team members review your code',
        'Check SQL for best practices',
        'Verify business logic is correct',
        'Only merged when approval is given'
      ]
    }
  ]

  return (
    <section className="section-container py-20 md:py-24 bg-gradient-to-br from-yellow-50 to-orange-50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Part 2: CI/CD Validation & Testing
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          When you open a pull request, automated testing validates your changes in an isolated environment. Only code that passes all checks can be merged.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {steps.map((step) => (
            <motion.button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg text-left transition-all ${
                activeStep === step.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white border border-gray-200 text-gray-900 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-lg font-bold flex-shrink-0 ${activeStep === step.id ? 'text-green-200' : 'text-green-600'}`}>
                  {step.id}
                </div>
                <h3 className="font-semibold text-sm">{step.title.split(' &')[0]}</h3>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Active Step Details */}
        <AnimatePresence mode="wait">
          {steps.map((step) => {
            if (activeStep !== step.id) return null

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg p-8 border-2 border-green-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: Details */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-6">{step.description}</p>

                    <div className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="flex gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Visualization */}
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 flex items-center justify-center min-h-80"
                  >
                    <div className="text-center">
                      {step.id === 2 && (
                        <div>
                          <Database className="w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse" />
                          <p className="font-semibold text-gray-900">Isolated PR Schema</p>
                          <p className="text-sm text-gray-600 mt-2">PR_1234</p>
                        </div>
                      )}
                      {step.id === 4 && (
                        <div>
                          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse" />
                          <p className="font-semibold text-gray-900">Tests Passing</p>
                          <p className="text-sm text-gray-600 mt-2">All validations successful</p>
                        </div>
                      )}
                      {step.id === 5 && (
                        <div>
                          <BarChart3 className="w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse" />
                          <p className="font-semibold text-gray-900">Data Comparison</p>
                          <p className="text-sm text-gray-600 mt-2">Before vs After Analysis</p>
                        </div>
                      )}
                      {!([2, 4, 5].includes(step.id)) && (
                        <div>
                          <AlertCircle className="w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse" />
                          <p className="font-semibold text-gray-900">Step {step.id}</p>
                          <p className="text-sm text-gray-600 mt-2">{step.title}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Visual Example: What CI/CD Looks Like */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 bg-white border-2 border-gray-300 rounded-lg overflow-hidden"
        >
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-300">
            <h3 className="font-bold text-gray-900">What a CI/CD Run Looks Like in dbt Cloud</h3>
          </div>
          <div className="p-6">
            <img
              src={ddPart2Screenshot1}
              alt="dbt Cloud CI/CD job showing test results and validation"
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-sm text-gray-600 mt-4 text-center italic">
              dbt Cloud shows detailed job results, test passes/failures, and artifacts
            </p>
          </div>
        </motion.div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <h4 className="text-lg font-bold text-blue-900 mb-4">Why CI/CD Matters</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-semibold text-blue-900 mb-2">Prevents Bugs</p>
              <p className="text-sm text-blue-800">Automated tests catch issues before they reach production</p>
            </div>
            <div>
              <p className="font-semibold text-blue-900 mb-2">Saves Time</p>
              <p className="text-sm text-blue-800">No manual testing needed—feedback is instant</p>
            </div>
            <div>
              <p className="font-semibold text-blue-900 mb-2">Enforces Standards</p>
              <p className="text-sm text-blue-800">Everyone follows the same validation process</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
