import { FileText, ChevronDown } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
      <div className="section-container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-green-600" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">dbt Story</h1>
        </div>
        <nav className="hidden md:flex gap-8">
          <a href="#prerequisites" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Concepts
          </a>
          <a href="#workflow" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Workflow
          </a>
          <a href="#learn-more" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            Learn More
          </a>
        </nav>
      </div>
    </header>
  )
}
