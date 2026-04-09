import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, GitBranch, Database, Play } from 'lucide-react'
import GitBranchingFlow from './GitBranchingFlow'
import CodeExample from './CodeExample'
import ddPart1Screenshot1 from '../assets/DD Part 1 Screenshot 1.png'

export default function Part1Development() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: null },
    { id: 'branches', label: 'Git Branching', icon: GitBranch },
    { id: 'dag', label: 'DAG in Dev', icon: Database },
    { id: 'code', label: 'Writing Code', icon: Code }
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
          Part 1: Development in Your Local Environment
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl">
          A developer creates a feature branch and writes new dbt models. All changes stay in their isolated development environment until they're ready for review.
        </p>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-gray-200">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              className={`px-4 py-3 font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-green-600 text-green-600 bg-green-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                {tab.icon && <tab.icon className="w-4 h-4" />}
                {tab.label}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-white border-2 border-gray-300 rounded-2xl p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">dbt Project Lineage</h3>
                <p className="text-gray-600 mb-8">How data flows through your dbt project layers</p>

                {/* Lineage Diagram */}
                <div className="relative bg-gradient-to-r from-green-50 via-gray-50 to-blue-50 rounded-xl p-12">
                  {/* Layer Headers */}
                  <div className="flex justify-between mb-8">
                    <div className="bg-green-100 border border-green-300 rounded px-3 py-1">
                      <p className="text-xs font-bold text-green-900">READ LAYER</p>
                    </div>
                    <div className="bg-blue-100 border border-blue-300 rounded px-3 py-1">
                      <p className="text-xs font-bold text-blue-900">WRITE LAYER</p>
                    </div>
                  </div>

                  {/* Main Lineage Grid */}
                  <div className="flex gap-12 items-stretch justify-between">
                    {/* Column 1: Raw Sources */}
                    <div className="flex flex-col gap-4 flex-1">
                      <p className="text-xs font-bold text-gray-500 mb-2">Sources</p>
                      {['raw_customers', 'raw_products', 'raw_orders', 'raw_product'].map((source, idx) => (
                        <motion.div
                          key={source}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-green-100 border-2 border-green-500 rounded-lg px-3 py-2 text-xs font-semibold text-green-900 cursor-pointer text-center"
                        >
                          {source}
                        </motion.div>
                      ))}
                    </div>

                    {/* Arrows and connections */}
                    <div className="flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-2xl text-gray-400"
                      >
                        →
                      </motion.div>
                    </div>

                    {/* Column 2: Staging Models */}
                    <div className="flex flex-col gap-4 flex-1">
                      <p className="text-xs font-bold text-gray-500 mb-2">Staging</p>
                      {['stg_customers', 'stg_products', 'stg_orders', 'stg_product'].map((model, idx) => (
                        <motion.div
                          key={model}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 + 0.2 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-blue-100 border-2 border-blue-400 rounded-lg px-3 py-2 text-xs font-semibold text-blue-900 cursor-pointer text-center"
                        >
                          {model}
                        </motion.div>
                      ))}
                    </div>

                    {/* Arrows */}
                    <div className="flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        className="text-2xl text-gray-400"
                      >
                        →
                      </motion.div>
                    </div>

                    {/* Column 3: Intermediate Models */}
                    <div className="flex flex-col gap-4 flex-1">
                      <p className="text-xs font-bold text-gray-500 mb-2">Intermediate</p>
                      {['int_customers_orders', 'int_product_orders'].map((model, idx) => (
                        <motion.div
                          key={model}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 + 0.4 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-purple-100 border-2 border-purple-400 rounded-lg px-3 py-2 text-xs font-semibold text-purple-900 cursor-pointer text-center"
                        >
                          {model}
                        </motion.div>
                      ))}
                    </div>

                    {/* Arrows */}
                    <div className="flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        className="text-2xl text-gray-400"
                      >
                        →
                      </motion.div>
                    </div>

                    {/* Column 4: Mart Models */}
                    <div className="flex flex-col gap-4 flex-1">
                      <p className="text-xs font-bold text-gray-500 mb-2">Mart</p>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-100 border-2 border-blue-600 rounded-lg px-3 py-2 text-xs font-semibold text-blue-900 cursor-pointer text-center"
                      >
                        fct_orders_with_customer_details
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'branches' && (
            <motion.div
              key="branches"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <GitBranchingFlow />
            </motion.div>
          )}

          {activeTab === 'dag' && (
            <motion.div
              key="dag"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Development DAG</h4>
                <p className="text-gray-600 mb-6">
                  When you run dbt in your development environment, the DAG shows you which models will execute and in what order.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={ddPart1Screenshot1}
                  alt="Development environment showing dbt Studio with models and DAG visualization"
                  className="w-full"
                />
                <p className="text-sm text-gray-600 p-4 text-center italic">
                  dbt Studio shows your project structure and DAG as you develop
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <span className="font-bold">What's happening:</span> You write SQL models → dbt detects dependencies via ref() and source() → automatically builds the DAG → models execute in order.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <CodeExample selectedIndex={0} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
