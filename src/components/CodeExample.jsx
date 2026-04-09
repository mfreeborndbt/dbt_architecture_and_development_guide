import { motion } from 'framer-motion'
import { Copy } from 'lucide-react'

const codeExamples = [
  {
    title: 'Source Definition (YAML)',
    file: 'sources.yml',
    code: `sources:
  - name: raw_data
    description: Raw tables from Shopify
    tables:
      - name: customers
        columns:
          - name: customer_id
            description: Unique customer identifier`
  },
  {
    title: 'Staging Model (SQL)',
    file: 'stg_customers.sql',
    code: `{{ config(materialized='view') }}

select
  customer_id,
  first_name,
  last_name,
  email,
  created_at
from {{ source('raw_data', 'customers') }}
where deleted_at is null`
  },
  {
    title: 'Core Model (SQL)',
    file: 'int_customers_with_orders.sql',
    code: `select
  c.customer_id,
  c.first_name,
  c.last_name,
  count(distinct o.order_id) as total_orders,
  sum(o.order_amount) as lifetime_value
from {{ ref('stg_customers') }} c
left join {{ ref('stg_orders') }} o
  on c.customer_id = o.customer_id
group by 1, 2, 3`
  },
  {
    title: 'Mart Model (Table)',
    file: 'dim_customers.sql',
    code: `{{ config(materialized='table') }}

select
  customer_id,
  first_name,
  last_name,
  total_orders,
  lifetime_value,
  case when lifetime_value > 1000 then 'VIP'
       when lifetime_value > 100 then 'Regular'
       else 'New' end as customer_segment
from {{ ref('int_customers_with_orders') }}`
  }
]

export default function CodeExample({ selectedIndex = 0 }) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">How SQL Maps to Models</h3>

      {/* Code Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {codeExamples.map((example, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.02 }}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedIndex === idx
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {example.title.split(' ')[0]}
          </motion.button>
        ))}
      </div>

      {/* Code Block */}
      <motion.div
        key={selectedIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 text-gray-100 rounded-lg p-6 overflow-x-auto relative group"
      >
        <div className="text-sm text-gray-400 mb-4 font-mono">
          {codeExamples[selectedIndex].file}
        </div>
        <pre className="font-mono text-sm leading-relaxed">
          <code>{codeExamples[selectedIndex].code}</code>
        </pre>

        {/* Copy Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
          onClick={() => navigator.clipboard.writeText(codeExamples[selectedIndex].code)}
        >
          <Copy className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Explanation */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Key Concept:</span> dbt models use <code className="bg-blue-100 px-2 py-1 rounded text-xs">{'{{ ref() }}'}</code> to reference other models and <code className="bg-blue-100 px-2 py-1 rounded text-xs">{'{{ source() }}'}</code> to reference raw sources. This creates the DAG automatically.
        </p>
      </div>
    </div>
  )
}
