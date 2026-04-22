# The dbt Interactive Guide

An interactive educational website that walks through how dbt works, from architecture and models to development workflows and orchestration. Built for data professionals learning dbt.

**Live site:** [mfreeborndbt.github.io/dbt_interactive_guide](https://mfreeborndbt.github.io/dbt_interactive_guide/)

## What's Inside

The guide is organized into five main sections, accessible via tabs at the top:

### 1. Architecture & Environments
- **Full Architecture** overview showing how Git, dbt, and your data platform connect
- **Git ↔ dbt** bidirectional sync walkthrough (pull, write, push)
- **dbt → Data Platform** compilation and execution flow with execution plan visualization
- **Environments & dbt Code** showing how environments define where code runs
- **Project Architecture** with lineage and code views across Logical, Dev, QA, and Prod environments

### 2. dbt Models
Interactive comparison of traditional SQL vs dbt models, with a "Without dbt / With dbt" toggle:
- **What is a Model?** - SQL SELECT that becomes a table, view, or incremental load
- **Modularity** - Break monolith scripts into reusable, testable pieces (with DAG visualization)
- **Reusable Logic** - Define macros once, call them everywhere (phone normalization example)
- **Abstracts DDL/DML** - Write SELECT, dbt generates MERGE (incremental materialization example)
- **Data Quality Framework** - YAML test definitions with animated build simulator
- **Lineage & Documentation** - Model lineage, column lineage with transformation tags, YAML docs
- **Environment Aware** - One codebase, different schemas per environment (Logical/Dev/QA/Prod tabs)
- **Version Controlled** - Git diff view showing change history and audit trail

### 3. dbt Development Workflow
- **Common Development Workflow** - Feature branch to production flow (5-step SVG diagram)
- **Development Process** - Step-by-step walkthrough across Develop, QA, and Production phases
  - Credential setup and branching
  - Code writing and committing
  - Pull requests with CI/CD
  - Deferral and slim CI
  - Data diffing and peer review
  - Production deployment

### 4. dbt Orchestration
Three phases with interactive simulators:

**Phase 1: Dependency Management**
- Manual orchestration comparison (Snowflake Tasks, Databricks Notebooks, Airflow)
- The ref() function explained with side-by-side SQL comparison
- Animated DAG build showing models executing in correct order

**Phase 2: Automated Testing**
- Tests as SQL queries (unique, not_null, accepted_values, relationships)
- Test configuration in YAML (basic and advanced)
- dbt build simulator with pass/fail scenarios showing downstream blocking

**Phase 3: State-Aware Orchestration**
- Pre-SAO default (rebuild everything, wasted compute highlighted)
- SAO default (source freshness, reused models)
- Advanced configuration (update: all blocking behavior)

### 5. dbt Semantic Layer
A governed metrics layer that turns questions into correct SQL for LLMs, apps, and BI.

**How It Works**
- Static flow diagram: User Input → dbt Semantic Layer (MetricFlow) → Generated SQL → Results
- Interactive "Walk Through a Query" animation with step-by-step terminal output
- Clickable stage highlighting after animation completes

**Problem It Solves**
- "Without Semantic Layer" vs "With Semantic Layer" toggle
- Covers: hundreds of tables, inconsistent definitions, LLM complexity
- With: curated tables, no ambiguity, LLM guardrails

**How It's Configured**
- 7-step walkthrough: Select Tables (DAG), Define Relationships, Add Dimensions, Define Metrics, Saved Queries (optional), Validate (interactive animation), Code Review & Deploy (visual git flow)
- Uses the latest dbt Semantic Layer v2.0 spec with syntax-highlighted YAML

## Tech Stack

- **React 19** with hooks
- **Vite 8** for build and dev server
- **Tailwind CSS 4** for styling
- **Framer Motion 12** for animations
- **Lucide React** for icons

## Getting Started

```bash
npm install
npm run dev
```

## Build and Deploy

```bash
npm run build
```

Deploys automatically to GitHub Pages on push to `main` via GitHub Actions.

## Project Structure

```
src/
  App.jsx                          # Main app with 5 top-level tabs
  components/
    InteractiveArchitecture.jsx    # Architecture diagrams and flows
    EnvironmentsSection.jsx        # Environment configuration cards
    ProjectArchitectureVisual.jsx  # Lineage and code view with env tabs
    TypicalWorkflow.jsx            # 5-step workflow SVG diagram
    DevelopmentWorkflow.jsx        # Full dev process walkthrough
    DbtModels.jsx                  # Model advantages with custom visuals
    PreDbtOrchestration.jsx        # Manual orchestration comparison
    HowDbtWorks.jsx                # ref() function comparison
    DbtRunAnimation.jsx            # Animated DAG build (dbt run)
    TestingExplanation.jsx         # Test SQL examples
    SettingUpTests.jsx             # YAML test configuration
    DbtBuildSimulator.jsx          # dbt build with test pass/fail
    StateAwareOrchestration.jsx    # SAO scenarios simulator
    SemanticLayer.jsx              # Semantic Layer section (3 tabs)
```
