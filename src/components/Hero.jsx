import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="section-container text-center py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Understanding dbt
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          A guided journey through the core concepts, architecture, and workflow of modern data transformation with dbt.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <motion.a
            href="#prerequisites"
            whileHover={{ scale: 1.05 }}
            className="btn-primary inline-flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="#workflow"
            whileHover={{ scale: 1.05 }}
            className="btn-secondary inline-flex items-center gap-2"
          >
            Jump to Workflow
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-12 border border-gray-200"
      >
        <p className="text-gray-600 text-sm font-medium mb-4">Perfect for:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Data Analysts</h3>
            <p className="text-sm text-gray-600">New to dbt and curious how it transforms data</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Data Engineers</h3>
            <p className="text-sm text-gray-600">Exploring dbt's workflow and best practices</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Decision Makers</h3>
            <p className="text-sm text-gray-600">Understanding dbt's value for your data stack</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
