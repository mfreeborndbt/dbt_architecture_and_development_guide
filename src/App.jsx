import { motion } from 'framer-motion'
import InteractiveArchitecture from './components/InteractiveArchitecture'
import TypicalWorkflow from './components/TypicalWorkflow'
import EnvironmentsSection from './components/EnvironmentsSection'
import ProjectArchitectureVisual from './components/ProjectArchitectureVisual'
import DevelopmentWorkflow from './components/DevelopmentWorkflow'

export default function App() {
  return (
    <div className="bg-white">

      {/* Page title */}
      <div className="section-container pt-10 pb-2 text-center">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            dbt Architecture &amp; Development Workflow
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            A guided walkthrough of how dbt connects Git, transformation logic, and your data platform from a code change to production data.
          </p>
        </motion.div>
      </div>

      {/* 1. Architecture */}
      <InteractiveArchitecture />

      {/* 2. Typical Workflow */}
      <div className="section-container py-6">
        <div className="bg-gradient-to-br from-slate-50 to-yellow-50 border border-slate-200 rounded-xl p-6">
          <TypicalWorkflow />
        </div>
      </div>

      {/* 3 + 4. Context: Environments & Project Architecture */}
      <div className="section-container py-6">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Context: Environments &amp; its interaction with dbt Code</h2>
          <p className="text-sm text-gray-500 mt-1">How environments define where code runs and where data lands.</p>
        </div>
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 rounded-xl p-6">
            <EnvironmentsSection />
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
            <ProjectArchitectureVisual />
          </div>
        </div>
      </div>

      {/* 5. Full Development Workflow */}
      <div className="section-container py-6 pb-12">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Development Workflow</h2>
          <p className="text-sm text-gray-500 mt-1">Follow the end-to-end workflow across development, QA, and production phases.</p>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50 border border-slate-200 rounded-xl p-6">
          <DevelopmentWorkflow />
        </div>
      </div>

    </div>
  )
}
