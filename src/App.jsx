import { motion } from 'framer-motion'
import InteractiveArchitecture from './components/InteractiveArchitecture'
import TypicalWorkflow from './components/TypicalWorkflow'
import EnvironmentsSection from './components/EnvironmentsSection'
import ProjectArchitectureVisual from './components/ProjectArchitectureVisual'
import DevelopmentWorkflow from './components/DevelopmentWorkflow'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero / page title */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-emerald-950 border-b border-gray-800 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08)_0%,_transparent_60%)]" />
        <div className="section-container py-12 md:py-16 text-center">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              dbt Architecture &amp; Development Workflow
            </h1>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
              A guided walkthrough of how dbt connects Git, transformation logic, and your data platform — from a code change to production data.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 1. Architecture */}
      <InteractiveArchitecture />

      {/* 2. Typical Workflow */}
      <div className="section-container py-4">
        <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
          <TypicalWorkflow />
        </div>
      </div>

      {/* 3 + 4. Context: Environments & Project Architecture */}
      <div className="section-container py-4">
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Context: Environments &amp; dbt Code</h2>
          <p className="text-sm text-gray-500 mt-1">How environments define where code runs and where data lands.</p>
        </div>
        <div className="space-y-4">
          <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
            <EnvironmentsSection />
          </div>
          <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
            <ProjectArchitectureVisual />
          </div>
        </div>
      </div>

      {/* 5. Full Development Workflow */}
      <div className="section-container py-4 pb-16">
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Development Workflow</h2>
          <p className="text-sm text-gray-500 mt-1">Follow the end-to-end workflow across development, QA, and production phases.</p>
        </div>
        <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
          <DevelopmentWorkflow />
        </div>
      </div>

    </div>
  )
}
