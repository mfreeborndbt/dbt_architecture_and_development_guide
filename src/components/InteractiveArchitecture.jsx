import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GitBranch, Code2, Database, BarChart3, RefreshCw, ArrowRight, GitMerge } from 'lucide-react'

export default function InteractiveArchitecture() {
  const [activeFlow, setActiveFlow] = useState('overview')
  const [gitPulse, setGitPulse] = useState(false)
  const [dbtPulse, setDbtPulse] = useState(false)
  const [dataflowPulse, setDataflowPulse] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setGitPulse(p => !p)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const flows = [
    {
      id: 'overview',
      label: 'Full Architecture',
      description: 'See how Git, dbt, and your data platform work together'
    },
    {
      id: 'git-flow',
      label: 'Git ↔ dbt',
      description: 'Two-way relationship: dbt reads and writes to Git'
    },
    {
      id: 'compile-flow',
      label: 'dbt → Data Platform',
      description: 'How dbt converts code to executable SQL and creates objects'
    }
  ]

  return (
    <section className="section-container py-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        {/* Tab Navigation — Full Architecture on top, detail tabs below */}
        <div className="flex flex-col items-center gap-2 mb-6 w-full max-w-md">
          {/* Row 1: Full Architecture */}
          <motion.button
            onClick={() => setActiveFlow('overview')}
            whileHover={{ scale: 1.03 }}
            className={`w-full px-6 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm ${
              activeFlow === 'overview'
                ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-900 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm'
            }`}
          >
            Full Architecture
          </motion.button>
          {/* Row 2: Detail tabs side by side */}
          <div className="flex w-full gap-2">
            {flows.slice(1).map((flow) => (
              <motion.button
                key={flow.id}
                onClick={() => setActiveFlow(flow.id)}
                whileHover={{ scale: 1.03 }}
                className={`flex-1 px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm ${
                  activeFlow === flow.id
                    ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-emerald-900 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm'
                }`}
              >
                {flow.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Visualization Area */}
        <div className="w-full">
          <div className="w-full">
            {/* Overview Flow */}
            {activeFlow === 'overview' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
              {/* Visual Flow Diagram */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border border-gray-200/60 rounded-2xl p-8 shadow-sm"
              >
                <div className="flex items-center justify-center gap-10">
                  {/* Git */}
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md mb-4 cursor-pointer"
                    >
                      <GitBranch className="w-10 h-10 text-white" />
                    </motion.div>
                    <p className="font-bold text-gray-900 text-center text-lg mb-1">Git</p>
                    <p className="text-xs text-gray-500 text-center font-semibold mb-1">Version Control Layer</p>
                    <p className="text-sm text-gray-700 text-center">Source code</p>
                  </div>

                  {/* One-Way Arrow: Git → dbt */}
                  <div className="flex flex-col items-center justify-center shrink-0">
                    <motion.div
                      animate={{ x: [4, 10, 4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl text-blue-600 font-bold"
                    >
                      →
                    </motion.div>
                  </div>

                  {/* dbt */}
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-md mb-4 cursor-pointer"
                    >
                      <div className="text-2xl text-white font-bold">dbt</div>
                    </motion.div>
                    <p className="font-bold text-gray-900 text-center text-lg mb-1">dbt</p>
                    <p className="text-xs text-gray-500 text-center font-semibold mb-1">Transformation Layer</p>
                    <p className="text-sm text-gray-700 text-center">
                      Develops code <span className="text-blue-500 font-medium">(git)</span><br />
                      Creates and orchestrates execution plan <span className="text-green-600 font-medium">(data platform)</span>
                    </p>
                  </div>

                  {/* One-Way Arrow */}
                  <div className="flex flex-col items-center justify-center shrink-0">
                    <motion.div
                      animate={{ x: [4, 10, 4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="text-4xl text-green-600 font-bold"
                    >
                      →
                    </motion.div>
                  </div>

                  {/* Data Platform */}
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-md mb-4 cursor-pointer"
                    >
                      <Database className="w-10 h-10 text-white" />
                    </motion.div>
                    <p className="font-bold text-gray-900 text-center text-lg mb-1">Data Platform</p>
                    <p className="text-xs text-gray-500 text-center font-semibold mb-1">Warehouse Layer</p>
                    <p className="text-sm text-gray-700 text-center">Storage/Compute, Executes SQL</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Git ↔ dbt Detailed Flow */}
          {activeFlow === 'git-flow' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-white border border-gray-200/60 rounded-2xl p-8 md:p-12 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Git ↔ dbt: Bidirectional Sync</h3>

                <div className="space-y-8">
                  {/* Step 1: Pull from Git */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Git Repository is Pulled into dbt</h4>
                      <p className="text-gray-700 mb-4">dbt syncs your code from Git</p>

                      {/* Visual: Git → dbt arrow with actual icons */}
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mb-4 flex items-center gap-6"
                      >
                        <div className="text-3xl">
                          <GitBranch className="w-8 h-8 text-orange-600" />
                        </div>
                        <div className="text-2xl text-orange-400 font-bold">→</div>
                        <div className="text-3xl bg-gradient-to-br from-orange-400 to-orange-600 text-white px-2 py-2 rounded-lg font-bold">
                          dbt
                        </div>
                      </motion.div>

                      <div className="bg-white rounded-lg p-4 border border-orange-300 font-mono text-sm">
                        <div className="text-orange-900">
                          <p>📁 my-dbt-project/</p>
                          <p className="ml-4">📁 models/</p>
                          <p className="ml-8">📁 01_staging/</p>
                          <p className="ml-12">📄 stg_customers.sql</p>
                          <p className="ml-12">📄 stg_orders.sql</p>
                          <p className="ml-8">📁 02_int/</p>
                          <p className="ml-12">📄 int_orders_with_items.sql</p>
                          <p className="ml-8">📁 03_mart/</p>
                          <p className="ml-12">📄 fct_orders.sql</p>
                          <p className="ml-4">📁 tests/</p>
                          <p className="ml-4">📄 dbt_project.yml</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Step 2: New Features Added - dbt Studio UI */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Write SQL Models in dbt Studio</h4>
                      <p className="text-gray-700 mb-4">Developer creates a new transformation in the editor</p>

                      {/* dbt Studio Mock UI */}
                      <div className="bg-white border border-blue-300 rounded-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-gray-100 border-b border-gray-300 px-4 py-3 flex items-center gap-2 text-sm">
                          <span className="text-gray-600">📁 int_customers_by_region.sql</span>
                          <span className="text-gray-400">×</span>
                        </div>

                        {/* Editor Area */}
                        <div className="flex">
                          {/* Left Sidebar - File Tree */}
                          <div className="w-80 bg-gray-50 border-r border-gray-300 p-4 text-xs font-mono">
                            <div className="text-gray-600 font-bold mb-4">models/</div>
                            <div className="space-y-0 text-gray-700">
                              <div>📁 01_staging/</div>
                              <div className="ml-5">📄 stg_customers.sql</div>
                              <div className="ml-5">📄 stg_orders.sql</div>
                              <div className="mt-2">📁 02_int/</div>
                              <div className="ml-5 bg-blue-200 px-2 py-1 rounded border-l-4 border-blue-600 font-bold text-blue-900">
                                📄 int_customers_by_region.sql
                              </div>
                              <div className="ml-5 px-2 py-1">📄 int_orders_with_items.sql</div>
                              <div className="mt-2">📁 03_mart/</div>
                              <div className="ml-5">📄 fct_orders.sql</div>
                            </div>
                          </div>

                          {/* Right Side - Code Editor */}
                          <div className="flex-1 p-6 bg-white">
                            <div className="font-mono text-xs space-y-1 text-gray-800">
                              <div><span className="text-orange-600">{`{{`}</span> <span className="text-purple-600">config</span><span className="text-orange-600">(</span><span className="text-green-600">materialized</span>=<span className="text-blue-600">'table'</span><span className="text-orange-600">)</span> <span className="text-orange-600">{`}}`}</span></div>
                              <div></div>
                              <div><span className="text-blue-600">select</span></div>
                              <div className="ml-4">c.customer_id,</div>
                              <div className="ml-4">c.customer_name,</div>
                              <div className="ml-4">r.region,</div>
                              <div className="ml-4"><span className="text-blue-600">count</span>(o.order_id) <span className="text-blue-600">as</span> total_orders</div>
                              <div><span className="text-blue-600">from</span> <span className="text-orange-600">{`{{`}</span> <span className="text-purple-600">ref</span>(<span className="text-green-600">'stg_customers'</span>) <span className="text-orange-600">{`}}`}</span> c</div>
                              <div><span className="text-blue-600">left join</span> <span className="text-orange-600">{`{{`}</span> <span className="text-purple-600">ref</span>(<span className="text-green-600">'stg_orders'</span>) <span className="text-orange-600">{`}}`}</span> o <span className="text-blue-600">on</span> c.customer_id = o.customer_id</div>
                              <div><span className="text-blue-600">left join</span> region r <span className="text-blue-600">on</span> c.region_id = r.region_id</div>
                              <div><span className="text-blue-600">group by</span> 1, 2, 3</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Step 3: Push Back to Git */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Changes Pushed Back to Git</h4>
                      <p className="text-gray-700 mb-4">dbt syncs your new code back to Git automatically</p>

                      {/* Visual: dbt → Git arrow with actual icons */}
                      <motion.div
                        animate={{ x: [0, -8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        className="mb-4 flex items-center gap-6"
                      >
                        <div className="text-3xl bg-gradient-to-br from-orange-400 to-orange-600 text-white px-2 py-2 rounded-lg font-bold">
                          dbt
                        </div>
                        <div className="text-2xl text-green-500 font-bold">→</div>
                        <div className="text-3xl">
                          <GitBranch className="w-8 h-8 text-orange-600" />
                        </div>
                      </motion.div>

                      <div className="bg-white rounded-lg p-4 border border-green-300 font-mono text-sm">
                        <div className="text-green-900">
                          <p>📁 my-dbt-project/</p>
                          <p className="ml-4">📁 models/</p>
                          <p className="ml-8">📁 01_staging/</p>
                          <p className="ml-12">📄 stg_customers.sql</p>
                          <p className="ml-12">📄 stg_orders.sql</p>
                          <p className="ml-8">📁 02_int/</p>
                          <p className="ml-12 text-green-600 font-bold">📄 int_customers_by_region.sql ✨ NEW</p>
                          <p className="ml-12">📄 int_orders_with_items.sql</p>
                          <p className="ml-8">📁 03_mart/</p>
                          <p className="ml-12">📄 fct_orders.sql</p>
                          <p className="ml-4">📁 tests/</p>
                          <p className="ml-4">📄 dbt_project.yml</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cycle */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      ↻
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Continuous Cycle</h4>
                      <p className="text-gray-700">
                        Pull from Git → Write code in dbt → Push back to Git → Repeat. This bidirectional sync keeps your code and dbt in perfect harmony.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Compilation & Execution Flow */}
          {activeFlow === 'compile-flow' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Main horizontal flow: dbt → Warehouse */}
              <div className="bg-white border border-gray-200/60 rounded-2xl p-8 md:p-12 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">dbt Compilation & Execution</h3>
                <p className="text-gray-600 mb-10">dbt converts your model into executable SQL, then sends it to your warehouse</p>

                {/* Three-column horizontal layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr_5fr] gap-6 items-center">
                  {/* Column 1: dbt Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/60 rounded-xl p-6"
                  >
                    <h4 className="text-sm font-bold text-blue-900 mb-4 uppercase tracking-wide">Inside dbt at runtime</h4>

                    {/* dbt Model */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-blue-800 mb-2">Your Model:</p>
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-white border border-blue-300 rounded p-3 font-mono text-xs cursor-pointer"
                      >
                        <div className="text-gray-800 space-y-1.5">
                          <div className="text-gray-600">-- int_customers_by_region.sql</div>
                          <div><span className="text-orange-600">{`{{`}</span><span className="text-purple-600">config</span><span className="text-orange-600">(</span><span className="text-green-600">materialized</span>=<span className="text-blue-600">'table'</span><span className="text-orange-600">){`}}`}</span></div>
                          <div><span className="text-blue-600">select</span> c.id, c.name, r.region</div>
                          <div><span className="text-blue-600">from</span> <span className="text-orange-600">{`{{`}</span><span className="text-purple-600">ref</span>(<span className="text-green-600">'stg_customers'</span>)<span className="text-orange-600">){`}}`}</span> c</div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-center text-xl font-bold text-blue-600 my-2"
                    >
                      ↓
                    </motion.div>

                    {/* Executable SQL */}
                    <div>
                      <p className="text-xs font-semibold text-blue-800 mb-2">Becomes:</p>
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-white border border-green-300 rounded p-3 font-mono text-xs overflow-x-auto cursor-pointer"
                      >
                        <div className="text-gray-800 space-y-0.5">
                          <div><span className="text-blue-600">create table</span></div>
                          <div><span className="text-cyan-600">analytics.int.int_customers_by_region</span> <span className="text-blue-600">as</span></div>
                          <div><span className="text-blue-600">select</span> c.id, c.name, r.region</div>
                          <div><span className="text-blue-600">from</span> <span className="text-cyan-600">analytics.staging.stg_customers</span> c</div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Column 2: Arrow to Warehouse with Icon */}
                  <motion.div
                    className="flex flex-col items-center justify-center h-full gap-4"
                  >
                    <motion.div
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="text-5xl text-green-600 font-bold"
                    >
                      →
                    </motion.div>
                    <div className="bg-green-100 border-4 border-green-500 rounded-full p-7">
                      <Database className="w-14 h-14 text-green-600" />
                    </div>
                    <div className="text-base font-bold text-gray-700">executes in</div>
                  </motion.div>

                  {/* Column 3: Data Warehouse */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.08 }}
                    className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/60 rounded-xl p-6 cursor-pointer"
                  >
                    <h4 className="text-sm font-bold text-green-900 mb-4 uppercase tracking-wide">Data Warehouse</h4>

                    <div className="bg-white border border-green-300 rounded p-4 font-mono text-xs">
                      <div className="text-green-900 space-y-1">
                        <div className="font-bold">🏢 analytics</div>
                        <div className="ml-3 font-bold">📁 production</div>
                        <div className="ml-6 text-blue-700">📋 stg_customers</div>
                        <div className="ml-6 text-blue-700">📋 stg_orders</div>
                        <div className="ml-6 bg-blue-100 border-l-2 border-blue-500 px-2 py-1 rounded font-bold text-blue-700">📋 int_customers_by_region</div>
                        <div className="ml-6 text-purple-700">📋 int_orders_with_items</div>
                        <div className="ml-6 text-emerald-700">📋 fct_orders</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
