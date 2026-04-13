import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const advantages = [
  {
    id: 'modularity',
    title: 'Modularity',
    icon: '🧩',
    without: `-- 500-line monolith script
-- Everything in one file
-- Can't test pieces independently

CREATE TABLE analytics.daily_report AS

WITH raw_customers AS (
  SELECT id, name, email, region
  FROM raw.customers
  WHERE is_active = true
),
raw_orders AS (
  SELECT order_id, customer_id, amount,
    order_date, status
  FROM raw.orders
  WHERE status != 'cancelled'
),
enriched AS (
  SELECT c.*, o.order_id, o.amount,
    o.order_date
  FROM raw_customers c
  JOIN raw_orders o
    ON c.id = o.customer_id
),
aggregated AS (
  SELECT region,
    COUNT(DISTINCT customer_id) as customers,
    SUM(amount) as revenue
  FROM enriched
  GROUP BY region
)
SELECT * FROM aggregated;

-- Want to reuse raw_customers logic?
-- Copy paste it into the next script.`,
    with_dbt: `-- models/staging/stg_customers.sql
SELECT id, name, email, region
FROM {{ source('raw', 'customers') }}
WHERE is_active = true

-- models/staging/stg_orders.sql
SELECT order_id, customer_id, amount,
  order_date, status
FROM {{ source('raw', 'orders') }}
WHERE status != 'cancelled'

-- models/intermediate/int_enriched.sql
SELECT c.*, o.order_id, o.amount,
  o.order_date
FROM {{ ref('stg_customers') }} c
JOIN {{ ref('stg_orders') }} o
  ON c.id = o.customer_id

-- models/marts/daily_report.sql
SELECT region,
  COUNT(DISTINCT customer_id) as customers,
  SUM(amount) as revenue
FROM {{ ref('int_enriched') }}
GROUP BY region

-- Each file is testable, readable,
-- and reusable independently.`,
  },
  {
    id: 'reusable',
    title: 'Reusable Logic',
    icon: '♻️',
    without: `-- Report A: customer_revenue.sql
SELECT c.id, c.name, c.region,
  SUM(o.amount) as revenue
FROM (
  SELECT id, name, email, region
  FROM raw.customers
  WHERE is_active = true
) c
JOIN raw.orders o ON c.id = o.customer_id
GROUP BY 1, 2, 3;

-- Report B: customer_churn.sql
SELECT c.id, c.name, c.region,
  MAX(o.order_date) as last_order
FROM (
  -- Same subquery, copied again
  SELECT id, name, email, region
  FROM raw.customers
  WHERE is_active = true
) c
JOIN raw.orders o ON c.id = o.customer_id
GROUP BY 1, 2, 3;

-- Report C: customer_segments.sql
-- Same subquery, copied a third time...
-- Update the filter? Find all copies.`,
    with_dbt: `-- stg_customers.sql (define once)
SELECT id, name, email, region
FROM {{ source('raw', 'customers') }}
WHERE is_active = true


-- customer_revenue.sql
SELECT c.id, c.name, c.region,
  SUM(o.amount) as revenue
FROM {{ ref('stg_customers') }} c
JOIN {{ ref('stg_orders') }} o
  ON c.id = o.customer_id
GROUP BY 1, 2, 3


-- customer_churn.sql
SELECT c.id, c.name, c.region,
  MAX(o.order_date) as last_order
FROM {{ ref('stg_customers') }} c
JOIN {{ ref('stg_orders') }} o
  ON c.id = o.customer_id
GROUP BY 1, 2, 3


-- Change the filter once in stg_customers,
-- every downstream model picks it up.`,
  },
  {
    id: 'ddl',
    title: 'Abstracts DDL/DML',
    icon: '✨',
    without: `-- You write and maintain all DDL:

CREATE OR REPLACE TABLE
  analytics.int_enriched_orders AS (

  SELECT
    o.order_id,
    o.customer_id,
    o.order_date,
    p.product_name,
    p.price * o.quantity AS total
  FROM analytics.stg_orders o
  LEFT JOIN analytics.stg_product p
    ON o.product_id = p.product_id
);

-- Also need to handle:
-- DROP TABLE IF EXISTS ...
-- ALTER TABLE for schema changes
-- GRANT SELECT ON ... TO role
-- Different DDL syntax per warehouse
--   (Snowflake vs BigQuery vs Redshift)
-- Swap table for zero-downtime deploys
-- Transaction management`,
    with_dbt: `{{ config(materialized='table') }}

SELECT
    o.order_id,
    o.customer_id,
    o.order_date,
    p.product_name,
    p.price * o.quantity AS total
FROM {{ ref('stg_orders') }} o
LEFT JOIN {{ ref('stg_product') }} p
    ON o.product_id = p.product_id








-- That's it. dbt handles:
-- CREATE, DROP, GRANT, SWAP
-- Warehouse-specific DDL
-- Schema migrations
-- Transaction wrapping`,
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
    without: `-- "Where does this column come from?"
-- "Who uses this table downstream?"
-- "What breaks if I change this?"

-- Your documentation:
--   Confluence pages (outdated)
--   Spreadsheets (who updates these?)
--   Tribal knowledge (hope they stay)
--   Slack threads (good luck searching)

-- Impact analysis before changes:
--   Manually grep through scripts
--   Ask around on Slack
--   "I think these 3 reports use it"
--   Deploy and hope nothing breaks

-- New team member onboarding:
--   "Talk to Sarah, she built that"
--   "Check the wiki, it might be there"
--   "Just read the 2000-line SQL file"`,
    with_dbt: `-- dbt auto-generates from your code:

-- 1. Full lineage graph
--    source > staging > int > mart
--    Click any node to see upstream
--    and downstream dependencies

-- 2. Column-level lineage
--    Track where each column
--    originates and flows to

-- 3. Model descriptions in YAML
--    - name: stg_orders
--      description: "Cleaned orders"
--      columns:
--        - name: order_id
--          description: "Primary key"

-- 4. Auto-generated docs site
--    Searchable, always up to date
--    "Which models use revenue?"
--    Instant answer.

-- 5. dbt Explorer
--    Visual catalog of your project`,
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

export default function DbtModels() {
  const [activeId, setActiveId] = useState('modularity')
  const [showDbt, setShowDbt] = useState(true)
  const active = advantages.find(a => a.id === activeId)

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

            {/* Code block */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeId}-${showDbt}`}
                initial={{ opacity: 0, x: showDbt ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: showDbt ? -10 : 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gray-950 rounded-xl p-5 font-mono text-[11px] leading-relaxed min-h-[380px] max-h-[480px] overflow-y-auto">
                  <pre className="text-gray-300 whitespace-pre-wrap">{showDbt ? active.with_dbt : active.without}</pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
