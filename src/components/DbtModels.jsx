import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const advantages = [
  {
    id: 'modularity',
    title: 'Modularity',
    icon: '🧩',
    custom: 'modularity',
  },
  {
    id: 'reusable',
    title: 'Reusable Logic',
    icon: '♻️',
    custom: 'reusable',
  },
  {
    id: 'ddl',
    title: 'Abstracts DDL/DML',
    icon: '✨',
    custom: 'ddl',
  },
  {
    id: 'testing',
    title: 'Data Quality Framework',
    icon: '🧪',
    without: `-- Ad-hoc validation scripts
-- Run manually after each deploy
-- No standard framework

SELECT COUNT(*) FROM orders
WHERE order_id IS NULL;
-- 3 rows... is that bad?

SELECT order_id, COUNT(*)
FROM orders
GROUP BY 1
HAVING COUNT(*) > 1;
-- Duplicates found. Who gets paged?

SELECT COUNT(*) FROM orders
WHERE status NOT IN (
  'placed','shipped','returned'
);
-- Unknown statuses. Since when?

-- No pass/fail thresholds
-- No blocking of downstream consumers
-- No audit trail of test results
-- No alerting integration`,
    with_dbt: `# _stg_models.yml
models:
  - name: stg_orders
    columns:
      - name: order_id
        data_tests:
          - unique
          - not_null

      - name: status
        data_tests:
          - accepted_values:
              values:
                - 'placed'
                - 'shipped'
                - 'returned'

      - name: customer_id
        data_tests:
          - not_null
          - relationships:
              to: ref('stg_customers')
              field: customer_id

# Tests run automatically in CI and prod.
# Failures block downstream models.
# Results are logged and auditable.`,
  },
  {
    id: 'lineage',
    title: 'Lineage & Documentation',
    icon: '🗺️',
    custom: 'lineage',
  },
  {
    id: 'environments',
    title: 'Environment Aware',
    icon: '🌍',
    without: `-- dev_orders.sql
CREATE TABLE dev_db.dev_schema.orders
AS SELECT * FROM dev_db.raw.orders;

-- staging_orders.sql
CREATE TABLE staging_db.staging.orders
AS SELECT * FROM staging_db.raw.orders;

-- prod_orders.sql
CREATE TABLE prod_db.analytics.orders
AS SELECT * FROM prod_db.raw.orders;

-- Three copies of the same logic
-- Different databases and schemas
-- "It works in dev!"
--   ...breaks in prod

-- Add a new model?
-- Create 3 new files.
-- Rename a column?
-- Update all 3.`,
    with_dbt: `-- orders.sql (one file, all envs)
SELECT *
FROM {{ source('raw', 'orders') }}


-- dbt resolves the target at runtime:

-- $ dbt run --target dev
--   > dev_db.dev_miles.orders

-- $ dbt run --target staging
--   > staging_db.staging.orders

-- $ dbt run --target prod
--   > prod_db.analytics.orders


-- Same code. Different targets.
-- Zero manual changes.
-- One file to maintain.`,
  },
  {
    id: 'versioned',
    title: 'Version Controlled',
    icon: '📦',
    without: `-- "Who changed the revenue calc?"
-- Check the audit log... if one exists

-- orders_v2_final_FINAL_v3.sql

-- Stored procedures in the warehouse
--   No git history
--   No code review process
--   No rollback plan
--   "Just run this script"

-- Scheduled jobs reference:
--   Hardcoded SQL in the scheduler
--   Scripts on someone's laptop
--   A shared drive somewhere

-- Rollback plan:
--   "Does anyone have the old version?"
--   "Check your downloads folder"`,
    with_dbt: `-- Every model is a file in Git

-- Full history:
--   git log models/fct_orders.sql
--   Who changed it, when, and why

-- Code review:
--   Pull requests before production
--   CI runs tests on every PR
--   Team reviews the diff

-- Rollback:
--   git revert <commit>
--   Redeploy. Done.

-- Model versions:
--   fct_orders_v1 (deprecated)
--   fct_orders_v2 (current)
--   Consumers migrate on their schedule`,
  },
]

/* ------------------------------------------------------------------ */
/*  DAG helper components                                             */
/* ------------------------------------------------------------------ */

function DagNode({ x, y, label, color = '#10b981' }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={120}
        height={32}
        rx={6}
        fill={color}
        opacity={0.15}
        stroke={color}
        strokeWidth={1.5}
      />
      <text
        x={x + 60}
        y={y + 20}
        textAnchor="middle"
        fill={color}
        fontSize={11}
        fontWeight={600}
        fontFamily="monospace"
      >
        {label}
      </text>
    </g>
  )
}

function DagEdge({ x1, y1, x2, y2, color = '#10b981' }) {
  const mx = (x1 + x2) / 2
  return (
    <path
      d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      opacity={0.5}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Modularity visual                                                 */
/* ------------------------------------------------------------------ */

function ModularityVisual({ showDbt }) {
  if (!showDbt) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-900 rounded-lg p-4 border border-red-500/30">
          <p className="text-red-400 text-xs font-semibold mb-2">report_a.sql</p>
          <pre className="text-gray-400 text-[11px] leading-relaxed whitespace-pre-wrap">{`SELECT c.id, c.name,
  o.order_id, o.amount, o.order_date,
  p.product_name
FROM raw.customers c
JOIN raw.orders o ON c.id = o.customer_id
JOIN raw.products p ON o.product_id = p.id
WHERE c.is_active = true
  AND o.status != 'cancelled'`}</pre>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-red-500/30">
          <p className="text-red-400 text-xs font-semibold mb-2">report_b.sql</p>
          <pre className="text-gray-400 text-[11px] leading-relaxed whitespace-pre-wrap">{`-- Same joins, copied again
SELECT c.id, c.name,
  o.order_id, o.amount, o.order_date,
  p.product_name
FROM raw.customers c
JOIN raw.orders o ON c.id = o.customer_id
JOIN raw.products p ON o.product_id = p.id
WHERE c.is_active = true
  AND o.status != 'cancelled'`}</pre>
        </div>
        <p className="text-red-400/70 text-xs text-center">Same join logic duplicated across every script. Change something? Find every copy.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* DAG */}
      <div className="bg-gray-900 rounded-lg p-4 border border-emerald-500/30 flex justify-center">
        <svg width="400" height="170" viewBox="0 0 400 170">
          {/* Sources row */}
          <DagNode x={10} y={10} label="stg_orders" />
          <DagNode x={270} y={10} label="stg_products" />
          {/* Intermediate */}
          <DagNode x={140} y={70} label="int_order_items" />
          {/* Edges to intermediate */}
          <DagEdge x1={130} y1={26} x2={140} y2={86} />
          <DagEdge x1={270} y1={26} x2={260} y2={86} />
          {/* Final models */}
          <DagNode x={30} y={130} label="fct_order_items" />
          <DagNode x={250} y={130} label="fct_orders" />
          {/* Edges from intermediate */}
          <DagEdge x1={140} y1={102} x2={150} y2={146} />
          <DagEdge x1={260} y1={102} x2={250} y2={146} />
          {/* "defined once" label */}
          <text x={200} y={64} textAnchor="middle" fill="#6ee7b7" fontSize={9} fontStyle="italic">defined once, referenced by both</text>
        </svg>
      </div>
      {/* Code cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gray-900 rounded-lg p-3 border border-emerald-500/20">
          <p className="text-emerald-400 text-[10px] font-semibold mb-1">stg_orders.sql</p>
          <pre className="text-gray-400 text-[10px] leading-snug whitespace-pre-wrap">{`SELECT order_id, customer_id,
  amount, order_date
FROM {{ source('raw','orders') }}
WHERE status != 'cancelled'`}</pre>
        </div>
        <div className="bg-gray-900 rounded-lg p-3 border border-emerald-500/20">
          <p className="text-emerald-400 text-[10px] font-semibold mb-1">int_order_items.sql</p>
          <pre className="text-gray-400 text-[10px] leading-snug whitespace-pre-wrap">{`SELECT o.*, p.product_name,
  p.price * o.qty AS total
FROM {{ ref('stg_orders') }} o
JOIN {{ ref('stg_products') }} p
  ON o.product_id = p.id`}</pre>
        </div>
        <div className="bg-gray-900 rounded-lg p-3 border border-emerald-500/20">
          <p className="text-emerald-400 text-[10px] font-semibold mb-1">fct_orders.sql</p>
          <pre className="text-gray-400 text-[10px] leading-snug whitespace-pre-wrap">{`SELECT customer_id,
  SUM(total) AS revenue
FROM {{ ref('int_order_items') }}
GROUP BY 1`}</pre>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Reusable Logic visual                                             */
/* ------------------------------------------------------------------ */

function ReusableLogicVisual({ showDbt }) {
  if (!showDbt) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-900 rounded-lg p-4 border border-red-500/30">
          <p className="text-red-400 text-xs font-semibold mb-2">stg_customers.sql</p>
          <pre className="text-gray-400 text-[11px] leading-relaxed whitespace-pre-wrap">{`SELECT
  id,
  name,
  REGEXP_REPLACE(
    REGEXP_REPLACE(phone, '[^0-9]', ''),
    '^1?(\\d{10})$', '(\\1) \\2-\\3'
  ) AS phone_clean
FROM raw.customers`}</pre>
          <p className="text-red-400/60 text-[10px] mt-2">Phone normalization logic inline</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-red-500/30">
          <p className="text-red-400 text-xs font-semibold mb-2">stg_vendors.sql</p>
          <pre className="text-gray-400 text-[11px] leading-relaxed whitespace-pre-wrap">{`SELECT
  id,
  company_name,
  REGEXP_REPLACE(
    REGEXP_REPLACE(phone, '[^0-9]', ''),
    '^1?(\\d{10})$', '(\\1) \\2-\\3'
  ) AS phone_clean
FROM raw.vendors`}</pre>
          <p className="text-red-400/60 text-[10px] mt-2">Same regex copied. Update one, forget the other.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Macro definition */}
      <div className="bg-gray-900 rounded-lg p-4 border-2 border-amber-500/60">
        <p className="text-amber-400 text-xs font-semibold mb-2">macros/normalize_phone.sql</p>
        <pre className="text-gray-300 text-[11px] leading-relaxed whitespace-pre-wrap">{`{% macro normalize_phone(column_name) %}
  REGEXP_REPLACE(
    REGEXP_REPLACE({{ column_name }}, '[^0-9]', ''),
    '^1?(\\d{10})$', '(\\1) \\2-\\3'
  )
{% endmacro %}`}</pre>
        <p className="text-amber-400/70 text-[10px] mt-2">Defined once. Tested once. Updated once.</p>
      </div>
      {/* Models calling the macro */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-900 rounded-lg p-3 border border-emerald-500/20">
          <p className="text-emerald-400 text-[10px] font-semibold mb-1">stg_customers.sql</p>
          <pre className="text-gray-400 text-[11px] leading-relaxed whitespace-pre-wrap">{'SELECT\n  id,\n  name,\n  '}<span className="text-amber-400 font-semibold">{"{{ normalize_phone('phone') }}"}</span>{'\n    AS phone_clean\nFROM {{ source(\'raw\',\'customers\') }}'}</pre>
        </div>
        <div className="bg-gray-900 rounded-lg p-3 border border-emerald-500/20">
          <p className="text-emerald-400 text-[10px] font-semibold mb-1">stg_vendors.sql</p>
          <pre className="text-gray-400 text-[11px] leading-relaxed whitespace-pre-wrap">{'SELECT\n  id,\n  company_name,\n  '}<span className="text-amber-400 font-semibold">{"{{ normalize_phone('phone') }}"}</span>{'\n    AS phone_clean\nFROM {{ source(\'raw\',\'vendors\') }}'}</pre>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  DDL visual                                                        */
/* ------------------------------------------------------------------ */

function DDLVisual({ showDbt }) {
  if (!showDbt) {
    return (
      <div className="space-y-3">
        <div className="bg-gray-900 rounded-lg p-4 border border-red-500/30">
          <p className="text-red-400 text-xs font-semibold mb-2">deploy_incremental_orders.sql</p>
          <pre className="text-gray-400 text-[11px] leading-relaxed whitespace-pre-wrap">{`-- Create target table if it doesn't exist
CREATE TABLE IF NOT EXISTS analytics.fct_orders (
  order_id    STRING,
  customer_id STRING,
  order_date  DATE,
  amount      NUMERIC,
  status      STRING,
  updated_at  TIMESTAMP
);

-- Incremental merge
MERGE INTO analytics.fct_orders AS target
USING (
  SELECT
    o.order_id,
    o.customer_id,
    o.order_date,
    o.amount,
    o.status,
    CURRENT_TIMESTAMP() AS updated_at
  FROM raw.orders o
  WHERE o.order_date >= DATEADD(day, -3, CURRENT_DATE)
) AS source
ON target.order_id = source.order_id
WHEN MATCHED THEN UPDATE SET
  target.customer_id = source.customer_id,
  target.order_date  = source.order_date,
  target.amount      = source.amount,
  target.status      = source.status,
  target.updated_at  = source.updated_at
WHEN NOT MATCHED THEN INSERT (
  order_id, customer_id, order_date,
  amount, status, updated_at
) VALUES (
  source.order_id, source.customer_id,
  source.order_date, source.amount,
  source.status, source.updated_at
);

-- Also handle:
-- Schema changes (ALTER TABLE ADD COLUMN)
-- Warehouse-specific MERGE syntax
-- Transaction wrapping (BEGIN...COMMIT)
-- GRANT permissions after rebuild
-- Error handling and rollback`}</pre>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Config block */}
      <div className="bg-gray-900 rounded-lg p-4 border-2 border-amber-500/60">
        <p className="text-amber-400 text-xs font-semibold mb-2">Config</p>
        <pre className="text-amber-300 text-[11px] leading-relaxed whitespace-pre-wrap">{`{{
  config(
    materialized = 'incremental',
    unique_key   = 'order_id',
    incremental_strategy = 'merge'
  )
}}`}</pre>
      </div>
      {/* Clean SELECT */}
      <div className="bg-gray-900 rounded-lg p-4 border border-emerald-500/30">
        <p className="text-emerald-400 text-xs font-semibold mb-2">fct_orders.sql</p>
        <pre className="text-gray-300 text-[11px] leading-relaxed whitespace-pre-wrap">{`SELECT
  o.order_id,
  o.customer_id,
  o.order_date,
  o.amount,
  o.status,
  CURRENT_TIMESTAMP() AS updated_at
FROM {{ ref('stg_orders') }} o`}</pre>
        <div className="mt-2 bg-amber-500/10 border border-amber-500/40 rounded px-3 py-2">
          <pre className="text-amber-300 text-[11px] leading-relaxed whitespace-pre-wrap">{`{% if is_incremental() %}
WHERE o.order_date >= DATEADD(
  day, -3, CURRENT_DATE
)
{% endif %}`}</pre>
        </div>
        <p className="text-emerald-400/70 text-[10px] mt-3">dbt generates the full MERGE statement, handles schema changes, transactions, and permissions automatically.</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Lineage visual                                                    */
/* ------------------------------------------------------------------ */

function LineageVisual({ showDbt }) {
  if (!showDbt) {
    return (
      <div className="space-y-4">
        <div className="bg-gray-900 rounded-lg p-4 border border-red-500/30">
          <p className="text-red-400 text-xs font-semibold mb-3">Where does this column come from?</p>
          <div className="space-y-2 text-gray-400 text-[11px]">
            <p>Your documentation:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-500">
              <li>Confluence pages (outdated)</li>
              <li>Spreadsheets (who updates these?)</li>
              <li>Tribal knowledge (hope they stay)</li>
              <li>Slack threads (good luck searching)</li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-red-500/30">
          <p className="text-red-400 text-xs font-semibold mb-3">Impact analysis before changes:</p>
          <div className="space-y-1 text-gray-500 text-[11px]">
            <p>Manually grep through scripts</p>
            <p>Ask around on Slack</p>
            <p>"I think these 3 reports use it"</p>
            <p>Deploy and hope nothing breaks</p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-red-500/30">
          <p className="text-red-400 text-xs font-semibold mb-3">New team member onboarding:</p>
          <div className="space-y-1 text-gray-500 text-[11px]">
            <p>"Talk to Sarah, she built that"</p>
            <p>"Check the wiki, it might be there"</p>
            <p>"Just read the 2000-line SQL file"</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Model lineage DAG */}
      <div className="bg-gray-900 rounded-lg p-4 border border-emerald-500/30">
        <p className="text-emerald-400 text-xs font-semibold mb-2">Model Lineage (auto-generated)</p>
        <div className="flex justify-center">
          <svg width="420" height="120" viewBox="0 0 420 120">
            {/* Sources */}
            <DagNode x={0} y={10} label="src_orders" color="#6366f1" />
            <DagNode x={0} y={60} label="src_customers" color="#6366f1" />
            {/* Staging */}
            <DagNode x={150} y={10} label="stg_orders" color="#10b981" />
            <DagNode x={150} y={60} label="stg_customers" color="#10b981" />
            {/* Mart */}
            <DagNode x={300} y={35} label="fct_orders" color="#f59e0b" />
            {/* Edges */}
            <DagEdge x1={120} y1={26} x2={150} y2={26} color="#6366f1" />
            <DagEdge x1={120} y1={76} x2={150} y2={76} color="#6366f1" />
            <DagEdge x1={270} y1={26} x2={300} y2={51} color="#10b981" />
            <DagEdge x1={270} y1={76} x2={300} y2={51} color="#10b981" />
          </svg>
        </div>
      </div>
      {/* Column lineage */}
      <div className="bg-gray-900 rounded-lg p-4 border border-emerald-500/30">
        <p className="text-emerald-400 text-xs font-semibold mb-2">Column-level Lineage</p>
        <div className="flex items-center justify-center gap-3 text-[10px] font-mono">
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded px-3 py-2 text-indigo-300">
            <p className="font-semibold mb-1">src_orders</p>
            <p>order_total</p>
          </div>
          <span className="text-gray-500">-&gt;</span>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded px-3 py-2 text-emerald-300">
            <p className="font-semibold mb-1">stg_orders</p>
            <p>amount</p>
          </div>
          <span className="text-gray-500">-&gt;</span>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded px-3 py-2 text-amber-300">
            <p className="font-semibold mb-1">fct_orders</p>
            <p>revenue</p>
          </div>
        </div>
      </div>
      {/* YAML docs */}
      <div className="bg-gray-900 rounded-lg p-4 border border-emerald-500/30">
        <p className="text-emerald-400 text-xs font-semibold mb-2">Documentation in YAML (always up to date)</p>
        <pre className="text-gray-300 text-[11px] leading-relaxed whitespace-pre-wrap">{`models:
  - name: fct_orders
    description: "Order-level fact table"
    columns:
      - name: order_id
        description: "Primary key from source"
      - name: revenue
        description: "Total order amount in USD"`}</pre>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function DbtModels() {
  const [activeId, setActiveId] = useState('modularity')
  const [showDbt, setShowDbt] = useState(true)
  const active = advantages.find(a => a.id === activeId)

  const renderCustomVisual = () => {
    switch (active.custom) {
      case 'modularity':
        return <ModularityVisual showDbt={showDbt} />
      case 'reusable':
        return <ReusableLogicVisual showDbt={showDbt} />
      case 'ddl':
        return <DDLVisual showDbt={showDbt} />
      case 'lineage':
        return <LineageVisual showDbt={showDbt} />
      default:
        return null
    }
  }

  return (
    <div className="section-container py-8 pb-16">
      <div className="bg-white border border-gray-200/60 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left sidebar: feature buttons */}
          <div className="lg:w-56 shrink-0 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200/60 p-3">
            <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible">
              {advantages.map((adv) => {
                const isActive = activeId === adv.id
                return (
                  <button
                    key={adv.id}
                    onClick={() => setActiveId(adv.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap text-left w-full ${
                      isActive
                        ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                        : 'text-gray-500 hover:bg-white/60 hover:text-gray-700'
                    }`}
                  >
                    <span className="text-base">{adv.icon}</span>
                    <span>{adv.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right content area */}
          <div className="flex-1 p-6">
            {/* Header + toggle */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-xl">{active.icon}</span>
                  {active.title}
                </h3>
              </div>
              {/* Toggle */}
              <div className="inline-flex bg-gray-100 rounded-lg p-0.5">
                <button
                  onClick={() => setShowDbt(false)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    !showDbt
                      ? 'bg-white text-red-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Without dbt
                </button>
                <button
                  onClick={() => setShowDbt(true)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    showDbt
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  With dbt
                </button>
              </div>
            </div>

            {/* Content area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeId}-${showDbt}`}
                initial={{ opacity: 0, x: showDbt ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: showDbt ? -10 : 10 }}
                transition={{ duration: 0.2 }}
              >
                {active.custom ? (
                  <div className="min-h-[380px] max-h-[480px] overflow-y-auto">
                    {renderCustomVisual()}
                  </div>
                ) : (
                  <div className="bg-gray-950 rounded-xl p-5 font-mono text-[11px] leading-relaxed min-h-[380px] max-h-[480px] overflow-y-auto">
                    <pre className="text-gray-300 whitespace-pre-wrap">{showDbt ? active.with_dbt : active.without}</pre>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
