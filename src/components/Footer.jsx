import { ExternalLink, Code } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="learn-more" className="bg-gray-900 text-white mt-20">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4">Learn More About dbt</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://docs.getdbt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  Official Documentation
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.getdbt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  dbt Labs
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/dbt-labs/dbt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  GitHub Repository
                  <Code className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://slack.getdbt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  Slack Community
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://courses.getdbt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  Free Courses
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://blog.getdbt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  Blog
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            dbt Story — A guided journey to understanding modern data transformation
          </p>
          <p className="text-gray-500 text-xs mt-4 md:mt-0">
            Built to educate and inspire data professionals
          </p>
        </div>
      </div>
    </footer>
  )
}
