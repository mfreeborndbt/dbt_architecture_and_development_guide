import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, GitMerge, CheckCircle, AlertCircle } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Step 1: Developer Creates Feature in Dev Environment',
    icon: GitBranch,
    color: 'from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
    description: 'A developer creates a new feature branch and develops in the dev environment',
    details: [
      'Create a new Git branch for the feature',
      'Connect dbt Studio to the development environment',
      'Write new models and tests',
      'Use dbt Cloud to run development jobs',
      'Data is isolated in a dev schema (e.g., PR_1234)'
    ],
    visualization: 'Dev Environment Active'
  },
  {
    id: 2,
    title: 'Step 2: CI/CD Validation & Testing',
    icon: AlertCircle,
    color: 'from-yellow-50 to-yellow-100',
    borderColor: 'border-yellow-200',
    description: 'Once code is pushed, automated checks validate the changes',
    details: [
      'Git push triggers a CI/CD job in dbt Cloud',
      'Code is compiled and validated',
      'dbt tests run to verify data quality',
      'Results are posted back to the PR',
      'Must pass all checks before merge is allowed'
    ],
    visualization: 'CI/CD Pipeline Running'
  },
  {
    id: 3,
    title: 'Step 3: Production Deployment Workflow',
    icon: GitMerge,
    color: 'from-green-50 to-green-100',
    borderColor: 'border-green-200',
    description: 'Once approved and merged, code is safely deployed to production',
    details: [
      'PR is merged to main branch',
      'Production deployment job is triggered',
      'Code runs in the production environment',
      'Data is built into the production schema',
      'Monitoring and alerts track the health of deployed models'
    ],
    visualization: 'Production Environment Updated'
  }
]

export default function WorkflowGuide() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section id="workflow" className="section-container py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          The Development & Deployment Workflow
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
          Follow the journey of code from development through CI/CD to production, understanding how dbt ensures safety and quality at each stage.
        </p>

        {/* Step Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {steps.map((step) => (
            <motion.button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 rounded-lg text-left transition-all ${
                activeStep === step.id
                  ? `bg-gradient-to-br ${step.color} border-2 ${step.borderColor} shadow-lg`
                  : 'bg-white border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <step.icon className={`w-6 h-6 mt-1 flex-shrink-0 ${
                  activeStep === step.id ? 'text-green-600' : 'text-gray-400'
                }`} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {step.title.split(': ')[0].split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <p className="text-sm text-gray-600">{step.title.split(': ')[1]}</p>
                </div>
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
              >
                <div className={`bg-gradient-to-br ${step.color} border-2 ${step.borderColor} rounded-lg p-8 md:p-12`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{step.title}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Details Column */}
                    <div>
                      <p className="text-gray-700 mb-6 leading-relaxed">{step.description}</p>
                      <div className="space-y-3">
                        {step.details.map((detail, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="flex gap-3 items-start"
                          >
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Visualization Column */}
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-lg p-8 border-2 border-gray-200 flex items-center justify-center min-h-80"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="mb-4"
                        >
                          <step.icon className="w-16 h-16 text-green-600 mx-auto" />
                        </motion.div>
                        <p className="font-semibold text-gray-900">{step.visualization}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          Step {step.id} of 3 in the dbt workflow
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center gap-3"
        >
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeStep === step.id ? 'bg-green-600 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
