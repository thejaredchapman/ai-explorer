import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  llmModels,
  providerOptions,
  categoryOptions,
  pricingOptions,
  capabilityLabels,
  sortOptions,
} from '../data/llmData';

function CapabilityBar({ label, value, max = 10 }) {
  const pct = (value / max) * 100;
  const color =
    value >= 9 ? '#22c55e' :
    value >= 7 ? '#3b82f6' :
    value >= 5 ? '#f59e0b' :
    value >= 1 ? '#ef4444' : '#e2e8f0';

  return (
    <div className="cap-bar-row">
      <span className="cap-bar-label">{label}</span>
      <div className="cap-bar-track">
        <motion.div
          className="cap-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ background: color }}
        />
      </div>
      <span className="cap-bar-value" style={{ color }}>{value === 0 ? '—' : value}</span>
    </div>
  );
}

function ModelCard({ model, expanded, onToggle, index }) {
  const categoryColors = {
    Frontier: '#6366f1',
    Balanced: '#3b82f6',
    Efficient: '#22c55e',
    Reasoning: '#f59e0b',
    'Open Source': '#10b981',
    Specialized: '#8b5cf6',
  };

  return (
    <motion.div
      className="llm-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
    >
      {/* Card Header */}
      <div className="llm-card-header" onClick={onToggle}>
        <div className="llm-card-identity">
          <div className="llm-card-icon" style={{ background: `${model.providerColor}15`, color: model.providerColor }}>
            {model.icon}
          </div>
          <div>
            <h3 className="llm-card-name">{model.name}</h3>
            <div className="llm-card-meta">
              <span className="llm-provider-badge" style={{ color: model.providerColor, borderColor: model.providerColor }}>
                {model.provider}
              </span>
              <span
                className="llm-category-badge"
                style={{ color: categoryColors[model.category], borderColor: categoryColors[model.category] }}
              >
                {model.category}
              </span>
              {model.openSource && <span className="llm-oss-badge">Open Source</span>}
              {model.multimodal && <span className="llm-multi-badge">Multimodal</span>}
            </div>
          </div>
        </div>
        <span className="llm-card-chevron">{expanded ? '▲' : '▼'}</span>
      </div>

      {/* Quick Stats Row */}
      <div className="llm-quick-stats">
        <div className="llm-stat">
          <span className="llm-stat-label">Context</span>
          <span className="llm-stat-value">{(model.contextWindow / 1000).toFixed(0)}K</span>
        </div>
        <div className="llm-stat">
          <span className="llm-stat-label">Params</span>
          <span className="llm-stat-value">{model.parameters}</span>
        </div>
        <div className="llm-stat">
          <span className="llm-stat-label">Input</span>
          <span className="llm-stat-value">
            {model.inputCost === 0 ? 'Free' : `$${model.inputCost}/M`}
          </span>
        </div>
        <div className="llm-stat">
          <span className="llm-stat-label">Output</span>
          <span className="llm-stat-value">
            {model.outputCost === 0 ? 'Free' : `$${model.outputCost}/M`}
          </span>
        </div>
        <div className="llm-stat">
          <span className="llm-stat-label">Pricing</span>
          <span className="llm-stat-value">{model.pricingTier}</span>
        </div>
      </div>

      {/* Top Capabilities Preview */}
      <div className="llm-caps-preview">
        {Object.entries(model.capabilities)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 4)
          .map(([key, val]) => (
            <span
              key={key}
              className="llm-cap-chip"
              style={{
                background: val >= 9 ? '#dcfce7' : val >= 7 ? '#dbeafe' : '#fef3c7',
                color: val >= 9 ? '#166534' : val >= 7 ? '#1e40af' : '#92400e',
              }}
            >
              {capabilityLabels[key]} {val}/10
            </span>
          ))}
      </div>

      {/* Expanded Detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="llm-card-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="llm-detail-section">
              <h4>Description</h4>
              <p>{model.description}</p>
            </div>

            <div className="llm-detail-section llm-usecase-box">
              <h4>Best Use Case</h4>
              <p>{model.bestUseCase}</p>
            </div>

            <div className="llm-detail-section">
              <h4>Capability Scores</h4>
              <div className="llm-caps-full">
                {Object.entries(model.capabilities).map(([key, val]) => (
                  <CapabilityBar key={key} label={capabilityLabels[key]} value={val} />
                ))}
              </div>
            </div>

            <div className="llm-detail-columns">
              <div className="llm-detail-section">
                <h4>Strengths</h4>
                <ul className="llm-tag-list green">
                  {model.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className="llm-detail-section">
                <h4>Limitations</h4>
                <ul className="llm-tag-list red">
                  {model.limitations.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
            </div>

            <div className="llm-detail-footer">
              <span>Released: {model.releaseDate}</span>
              <span>Max Output: {(model.maxOutput).toLocaleString()} tokens</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LlmRubric() {
  const [search, setSearch] = useState('');
  const [providerFilter, setProviderFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [pricingFilter, setPricingFilter] = useState('All');
  const [openSourceOnly, setOpenSourceOnly] = useState(false);
  const [multimodalOnly, setMultimodalOnly] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [expandedId, setExpandedId] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

  const filtered = useMemo(() => {
    let result = [...llmModels];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.bestUseCase.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    }

    // Filters
    if (providerFilter !== 'All') result = result.filter(m => m.provider === providerFilter);
    if (categoryFilter !== 'All') result = result.filter(m => m.category === categoryFilter);
    if (pricingFilter !== 'All') result = result.filter(m => m.pricingTier === pricingFilter);
    if (openSourceOnly) result = result.filter(m => m.openSource);
    if (multimodalOnly) result = result.filter(m => m.multimodal);

    // Sort
    result.sort((a, b) => {
      let valA, valB;
      if (['reasoning', 'coding', 'math', 'speed'].includes(sortBy)) {
        valA = a.capabilities[sortBy];
        valB = b.capabilities[sortBy];
      } else if (sortBy === 'contextWindow' || sortBy === 'inputCost' || sortBy === 'outputCost') {
        valA = a[sortBy];
        valB = b[sortBy];
      } else if (sortBy === 'releaseDate') {
        valA = a.releaseDate;
        valB = b.releaseDate;
      } else if (sortBy === 'provider') {
        valA = a.provider;
        valB = b.provider;
      } else {
        valA = a.name;
        valB = b.name;
      }

      if (typeof valA === 'string') {
        return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortDir === 'asc' ? valA - valB : valB - valA;
    });

    return result;
  }, [search, providerFilter, categoryFilter, pricingFilter, openSourceOnly, multimodalOnly, sortBy, sortDir]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDir('desc');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setProviderFilter('All');
    setCategoryFilter('All');
    setPricingFilter('All');
    setOpenSourceOnly(false);
    setMultimodalOnly(false);
    setSortBy('name');
    setSortDir('asc');
  };

  const hasActiveFilters = search || providerFilter !== 'All' || categoryFilter !== 'All' ||
    pricingFilter !== 'All' || openSourceOnly || multimodalOnly;

  return (
    <section className="section" id="llm-rubric">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">Step 2 — Compare Models</span>
        <h2>LLM Model Rubric</h2>
        <p>
          Now that you understand the concepts, compare the actual models. Use the filters and sorting to find the right LLM
          for your use case — whether you need top reasoning, fast speed, or open-source flexibility. Click any model for full details.
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="llm-search-bar">
        <input
          type="text"
          className="llm-search-input"
          placeholder="Search models, providers, or capabilities..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {hasActiveFilters && (
          <button className="llm-clear-btn" onClick={clearFilters}>
            Clear All Filters
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="llm-filters">
        <div className="llm-filter-group">
          <label className="llm-filter-label">Provider</label>
          <div className="llm-filter-chips">
            {providerOptions.map(p => (
              <button
                key={p}
                className={`llm-filter-chip ${providerFilter === p ? 'active' : ''}`}
                onClick={() => setProviderFilter(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="llm-filter-group">
          <label className="llm-filter-label">Category</label>
          <div className="llm-filter-chips">
            {categoryOptions.map(c => (
              <button
                key={c}
                className={`llm-filter-chip ${categoryFilter === c ? 'active' : ''}`}
                onClick={() => setCategoryFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="llm-filter-group">
          <label className="llm-filter-label">Pricing</label>
          <div className="llm-filter-chips">
            {pricingOptions.map(p => (
              <button
                key={p}
                className={`llm-filter-chip ${pricingFilter === p ? 'active' : ''}`}
                onClick={() => setPricingFilter(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="llm-filter-group">
          <label className="llm-filter-label">Features</label>
          <div className="llm-filter-chips">
            <button
              className={`llm-filter-chip ${openSourceOnly ? 'active' : ''}`}
              onClick={() => setOpenSourceOnly(!openSourceOnly)}
            >
              Open Source Only
            </button>
            <button
              className={`llm-filter-chip ${multimodalOnly ? 'active' : ''}`}
              onClick={() => setMultimodalOnly(!multimodalOnly)}
            >
              Multimodal Only
            </button>
          </div>
        </div>

        <div className="llm-filter-group">
          <label className="llm-filter-label">Sort By</label>
          <div className="llm-filter-chips">
            {sortOptions.map(s => (
              <button
                key={s.id}
                className={`llm-filter-chip ${sortBy === s.id ? 'active' : ''}`}
                onClick={() => toggleSort(s.id)}
              >
                {s.label} {sortBy === s.id ? (sortDir === 'asc' ? '↑' : '↓') : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View Toggle & Count */}
      <div className="llm-toolbar">
        <p className="filter-count">
          Showing {filtered.length} of {llmModels.length} models
        </p>
        <div className="llm-view-toggle">
          <button
            className={`llm-view-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
          >
            Cards
          </button>
          <button
            className={`llm-view-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            Table
          </button>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' && (
        <motion.div className="llm-cards-grid" layout>
          <AnimatePresence>
            {filtered.map((model, i) => (
              <ModelCard
                key={model.id}
                model={model}
                expanded={expandedId === model.id}
                onToggle={() => setExpandedId(expandedId === model.id ? null : model.id)}
                index={i}
              />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="llm-empty">
              <p>No models match your filters. Try adjusting your search or clearing filters.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="llm-table-wrapper">
          <table className="llm-table">
            <thead>
              <tr>
                <th onClick={() => toggleSort('name')} className="sortable">
                  Model {sortBy === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => toggleSort('provider')} className="sortable">
                  Provider {sortBy === 'provider' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => toggleSort('contextWindow')} className="sortable">
                  Context {sortBy === 'contextWindow' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => toggleSort('inputCost')} className="sortable">
                  Input $/M {sortBy === 'inputCost' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => toggleSort('reasoning')} className="sortable">
                  Reason {sortBy === 'reasoning' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => toggleSort('coding')} className="sortable">
                  Code {sortBy === 'coding' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => toggleSort('math')} className="sortable">
                  Math {sortBy === 'math' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th onClick={() => toggleSort('speed')} className="sortable">
                  Speed {sortBy === 'speed' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th>Open</th>
                <th>Multi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr
                  key={m.id}
                  className={`llm-table-row ${expandedId === m.id ? 'expanded' : ''}`}
                  onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}
                >
                  <td className="llm-table-name">
                    <span className="llm-table-icon" style={{ color: m.providerColor }}>{m.icon}</span>
                    {m.name}
                  </td>
                  <td><span style={{ color: m.providerColor, fontWeight: 600 }}>{m.provider}</span></td>
                  <td>{(m.contextWindow / 1000).toFixed(0)}K</td>
                  <td>{m.inputCost === 0 ? 'Free' : `$${m.inputCost}`}</td>
                  <td><span className={`score-cell score-${m.capabilities.reasoning >= 9 ? 'high' : m.capabilities.reasoning >= 7 ? 'mid' : 'low'}`}>{m.capabilities.reasoning}</span></td>
                  <td><span className={`score-cell score-${m.capabilities.coding >= 9 ? 'high' : m.capabilities.coding >= 7 ? 'mid' : 'low'}`}>{m.capabilities.coding}</span></td>
                  <td><span className={`score-cell score-${m.capabilities.math >= 9 ? 'high' : m.capabilities.math >= 7 ? 'mid' : 'low'}`}>{m.capabilities.math}</span></td>
                  <td><span className={`score-cell score-${m.capabilities.speed >= 9 ? 'high' : m.capabilities.speed >= 7 ? 'mid' : 'low'}`}>{m.capabilities.speed}</span></td>
                  <td>{m.openSource ? '✓' : '—'}</td>
                  <td>{m.multimodal ? '✓' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="llm-empty">
              <p>No models match your filters.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
