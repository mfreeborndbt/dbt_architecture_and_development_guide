import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const dagNodes = [
  { id: 'sources', name: 'Sources', type: 'source', color: 'bg-green-100 border-green-400' },
  { id: 'staging', name: 'Staging Models\n(stg_*)', type: 'staging', color: 'bg-blue-100 border-blue-400' },
  { id: 'core', name: 'Core Models\n(int_*)', type: 'core', color: 'bg-purple-100 border-purple-400' },
  { id: 'marts', name: 'Marts\n(fct_*, dim_*)', type: 'mart', color: 'bg-orange-100 border-orange-400' },
]

export default function DAGVisualization() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">The dbt DAG: Data Transformation Flow</h3>
        <p className="text-sm text-gray-600 mb-6">
          Each box represents a model. Arrows show dependencies. dbt executes them in order, so downstream models always wait for upstream ones to complete.
        </p>
      </div>

      {/* DAG Visualization */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 overflow-x-auto">
        <div className="min-w-max flex items-center justify-center gap-4">
          {dagNodes.map((node, idx) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-4"
            >
              {/* Node */}
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                className={`${node.color} border-2 rounded-lg p-4 text-center font-semibold text-sm whitespace-nowrap min-w-max transition-all`}
              >
                {node.name}
              </motion.div>

              {/* Arrow */}
              {idx < dagNodes.length - 1 && (
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-gray-400"
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">Sources</h4>
          <p className="text-sm text-green-800">Raw data from your data warehouse that dbt reads</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Staging</h4>
          <p className="text-sm text-blue-800">Clean & standardize raw data, apply basic transformations</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900 mb-2">Core/Intermediate</h4>
          <p className="text-sm text-purple-800">Build business logic, join tables, create relationships</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-orange-900 mb-2">Marts</h4>
          <p className="text-sm text-orange-800">Final tables for specific use cases (facts, dimensions)</p>
        </div>
      </div>
    </div>
  )
}
