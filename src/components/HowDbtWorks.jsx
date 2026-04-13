import { motion } from 'framer-motion'

export default function HowDbtWorks() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Regular SQL */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Regular SQL
          </h3>
        </div>

        <div className="bg-gray-950 rounded-xl p-4 font-mono text-[11px] leading-relaxed">
          <div className="text-gray-500 text-[10px] mb-2">int_enriched_orders.sql</div>
          <pre className="text-gray-300">
<span className="text-blue-400">CREATE OR REPLACE TABLE</span>{` analytics.int_enriched_orders `}<span className="text-blue-400">AS</span>{`

`}<span className="text-blue-400">SELECT</span>{`
    o.order_id,
    o.customer_id,
    o.order_date,
    o.status,
    p.product_name,
    p.category,
    p.price
`}<span className="text-blue-400">FROM</span>{` `}<span className="text-red-400">analytics.stg_orders</span>{` o
`}<span className="text-blue-400">LEFT JOIN</span>{` `}<span className="text-red-400">analytics.stg_product</span>{` p
    `}<span className="text-blue-400">ON</span>{` o.product_id = p.product_id`}
          </pre>
          <div className="border-t border-gray-800 mt-3 pt-3 space-y-1">
            <div className="text-red-400 text-[10px] flex items-start gap-1.5">
              <span className="mt-0.5">&#x2717;</span>
              <span>Hardcoded table references. If a table name or schema changes, this breaks.</span>
            </div>
            <div className="text-red-400 text-[10px] flex items-start gap-1.5">
              <span className="mt-0.5">&#x2717;</span>
              <span>No dependency tracking. The scheduler has no idea this depends on stg_orders and stg_product.</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right: dbt SQL */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            dbt SQL
          </h3>
        </div>

        <div className="bg-gray-950 rounded-xl p-4 font-mono text-[11px] leading-relaxed">
          <div className="text-gray-500 text-[10px] mb-2">models/intermediate/int_enriched_orders.sql</div>
          <pre className="text-gray-300">
<span className="text-amber-400">{"{{ config(materialized='table') }}"}</span>{`

`}<span className="text-blue-400">SELECT</span>{`
    o.order_id,
    o.customer_id,
    o.order_date,
    o.status,
    p.product_name,
    p.category,
    p.price
`}<span className="text-blue-400">FROM</span>{` `}<span className="text-emerald-400">{"{{ ref('stg_orders') }}"}</span>{` o
`}<span className="text-blue-400">LEFT JOIN</span>{` `}<span className="text-emerald-400">{"{{ ref('stg_product') }}"}</span>{` p
    `}<span className="text-blue-400">ON</span>{` o.product_id = p.product_id`}
          </pre>
          <div className="border-t border-gray-800 mt-3 pt-3 space-y-1">
            <div className="text-emerald-400 text-[10px] flex items-start gap-1.5">
              <span className="mt-0.5">&#x2713;</span>
              <span>ref() tells dbt this model depends on stg_orders and stg_product</span>
            </div>
            <div className="text-emerald-400 text-[10px] flex items-start gap-1.5">
              <span className="mt-0.5">&#x2713;</span>
              <span>dbt resolves the schema and table name at compile time. Works across environments.</span>
            </div>
            <div className="text-emerald-400 text-[10px] flex items-start gap-1.5">
              <span className="mt-0.5">&#x2713;</span>
              <span>No CREATE TABLE boilerplate. dbt handles materialization.</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
