<script setup>
import { ref } from 'vue'
import { Layers, Code2, Terminal, Cpu, Sparkles, CheckCircle2 } from 'lucide-vue-next'
import { skillCategories } from '@/data/cvData'

const iconMap = {
  Layers,
  Code2,
  Terminal,
  Cpu
}

// Interactive state for the Reusable UI Component Kit showcase (from CV: InputText, RadioButton, DatePicker, TableList, BasicSelect)
const sampleInvoiceClient = ref('NCGR — Etimad Portal')
const sampleCategory = ref('GovTech Portal')
const samplePriority = ref('High Availability')
const sampleDate = ref('2026-11-08')

const sampleRows = [
  { id: 'INV-1042', module: 'Etimad Financial Portal', stack: 'Vue.js + Vitest', status: 'Verified' },
  { id: 'INV-1039', module: 'Monshaat SME Services', stack: 'Vue.js + Drupal', status: 'Production' },
  { id: 'INV-1031', module: 'Buyers-Compass Charts', stack: 'Vue.js + REST', status: 'Live' }
]
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <div v-reveal class="section-header">
        <div class="section-eyebrow">
          <span class="section-eyebrow-dot"></span>
          <span>Technical Arsenal</span>
        </div>
        <h2 class="section-title">
          Engineering <span class="text-gradient-accent">Skills &amp; Component Craft</span>
        </h2>
        <p class="section-subtitle">
          Deep specialization in modern JavaScript &amp; TypeScript ecosystems, reactive frontend
          frameworks, automated unit testing with Vitest, and reusable UI architecture.
        </p>
      </div>

      <!-- 4-Column Bento Matrix of Skills -->
      <div class="skills-grid">
        <div
          v-for="(cat, idx) in skillCategories"
          :key="cat.id"
          v-reveal="{ delay: idx * 75, y: 20 }"
          v-spotlight
          class="spotlight-card skill-card"
        >
          <div class="skill-card-header">
            <div
              class="skill-icon-box"
              :style="{
                color: cat.accent,
                borderColor: `${cat.accent}35`,
                background: `${cat.accent}12`
              }"
            >
              <component :is="iconMap[cat.icon]" :size="20" />
            </div>
            <div>
              <h3 class="skill-cat-title">{{ cat.title }}</h3>
              <p class="skill-cat-sub">{{ cat.subtitle }}</p>
            </div>
          </div>

          <div class="skill-items">
            <div
              v-for="skill in cat.skills"
              :key="skill.name"
              class="skill-row"
              :class="{ highlighted: skill.highlight }"
            >
              <div class="skill-name-wrap">
                <span
                  class="skill-bullet"
                  :style="{ background: skill.highlight ? cat.accent : '#4b5563' }"
                ></span>
                <span class="skill-name">{{ skill.name }}</span>
              </div>
              <span class="skill-level">{{ skill.level }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Component Kit Preview (Demonstrating CV Reusable Primitives) -->
      <div v-reveal="{ delay: 180, y: 24 }" v-spotlight class="spotlight-card playground-card no-print">
        <div class="playground-header">
          <div>
            <div class="playground-badge">
              <Sparkles :size="13" />
              <span>Interactive Design System Showcase</span>
            </div>
            <h3 class="playground-title">
              Reusable UI Component Library
              <span class="playground-mono">
                (&lt;InputText /&gt; · &lt;BasicSelect /&gt; · &lt;RadioButton /&gt; · &lt;DatePicker /&gt; · &lt;TableList /&gt;)
              </span>
            </h3>
            <p class="playground-desc">
              Inspired by the reusable component library I architected for the Enterprise Accounting
              System—test the live reactive primitives below:
            </p>
          </div>
        </div>

        <div class="playground-grid">
          <!-- Controls Column -->
          <div class="playground-controls">
            <div class="field-group">
              <label class="field-label">
                <span>&lt;InputText /&gt;</span>
                <span class="field-hint">Two-way reactive v-model</span>
              </label>
              <input
                v-model="sampleInvoiceClient"
                type="text"
                class="ui-input"
                placeholder="Enter project or client..."
              />
            </div>

            <div class="field-row-2">
              <div class="field-group">
                <label class="field-label">
                  <span>&lt;BasicSelect /&gt;</span>
                </label>
                <select v-model="sampleCategory" class="ui-select">
                  <option value="GovTech Portal">GovTech Portal</option>
                  <option value="FinTech Accounting">FinTech Accounting</option>
                  <option value="Telecom GIS Map">Telecom GIS Map</option>
                  <option value="Commodity Analytics">Commodity Analytics</option>
                </select>
              </div>

              <div class="field-group">
                <label class="field-label">
                  <span>&lt;DatePicker /&gt;</span>
                </label>
                <input v-model="sampleDate" type="date" class="ui-input" />
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">
                <span>&lt;RadioButton /&gt;</span>
                <span class="field-hint">Accessible state tokens</span>
              </label>
              <div class="radio-group">
                <button
                  v-for="opt in ['High Availability', 'Vitest Verified', 'Design Tokenized']"
                  :key="opt"
                  type="button"
                  class="radio-pill"
                  :class="{ active: samplePriority === opt }"
                  @click="samplePriority = opt"
                >
                  <span class="radio-dot"></span>
                  <span>{{ opt }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Live TableList Preview Column -->
          <div class="playground-preview">
            <div class="preview-top-bar">
              <span class="preview-tag">&lt;TableList /&gt; Live Bound Output</span>
              <span class="preview-date">{{ sampleDate }}</span>
            </div>

            <div class="live-summary-banner">
              <div>
                <span class="lsb-label">Active Entity:</span>
                <strong>{{ sampleInvoiceClient || 'Untitled Module' }}</strong>
              </div>
              <div class="lsb-pills">
                <span class="tech-pill">{{ sampleCategory }}</span>
                <span class="tech-pill" style="color: #34d399; border-color: rgba(16, 185, 129, 0.35)">
                  {{ samplePriority }}
                </span>
              </div>
            </div>

            <div class="ui-table-wrap">
              <table class="ui-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Platform Module</th>
                    <th>Architecture</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in sampleRows" :key="row.id">
                    <td class="mono-cell">{{ row.id }}</td>
                    <td>{{ row.module }}</td>
                    <td class="mono-cell">{{ row.stack }}</td>
                    <td>
                      <span class="status-tag">
                        <CheckCircle2 :size="12" />
                        {{ row.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.35rem;
  margin-bottom: 2rem;
}

.skill-card {
  padding: 1.85rem;
}

.skill-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.skill-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.skill-cat-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.15rem;
}

.skill-cat-sub {
  font-size: 0.82rem;
  color: var(--text-secondary);
}

.skill-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.65rem;
}

.skill-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.25s ease;
}

.skill-row.highlighted {
  background: rgba(255, 255, 255, 0.035);
  border-color: rgba(255, 255, 255, 0.09);
}

.skill-row:hover {
  border-color: rgba(16, 185, 129, 0.35);
  transform: translateY(-1px);
}

.skill-name-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.skill-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skill-name {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--text-primary);
}

.skill-level {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-muted);
}

/* Interactive Component Kit Playground */
.playground-card {
  padding: 2rem 2.15rem;
}

.playground-header {
  margin-bottom: 1.65rem;
}

.playground-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--accent-cyan);
  margin-bottom: 0.5rem;
}

.playground-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.playground-mono {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--accent-emerald);
  margin-left: 0.35rem;
}

.playground-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.playground-grid {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 1.75rem;
  align-items: start;
}

.playground-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: #34d399;
}

.field-hint {
  color: var(--text-muted);
  font-size: 0.68rem;
}

.ui-input,
.ui-select {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: 10px;
  font-family: var(--font-sans);
  font-size: 0.86rem;
  color: var(--text-primary);
  background: rgba(9, 10, 15, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.12);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.ui-input:focus,
.ui-select:focus {
  border-color: var(--accent-emerald);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.radio-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.48rem 0.8rem;
  border-radius: 9px;
  font-size: 0.79rem;
  font-weight: 600;
  color: var(--text-secondary);
  background: rgba(9, 10, 15, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.09);
  transition: all 0.2s ease;
}

.radio-pill.active {
  color: #ffffff;
  border-color: rgba(16, 185, 129, 0.45);
  background: rgba(16, 185, 129, 0.12);
}

.radio-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid var(--text-muted);
}

.radio-pill.active .radio-dot {
  border-color: var(--accent-emerald);
  background: var(--accent-emerald);
}

.playground-preview {
  background: rgba(9, 10, 15, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 1.15rem;
}

.preview-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--accent-cyan);
  margin-bottom: 0.85rem;
}

.preview-date {
  color: var(--text-muted);
}

.live-summary-banner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;
  padding: 0.75rem 0.9rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 0.9rem;
}

.lsb-label {
  font-size: 0.74rem;
  color: var(--text-muted);
  margin-right: 0.4rem;
}

.live-summary-banner strong {
  font-size: 0.88rem;
  color: var(--text-primary);
}

.lsb-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.ui-table-wrap {
  overflow-x: auto;
}

.ui-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;
}

.ui-table th {
  text-align: left;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 0.55rem 0.65rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.ui-table td {
  padding: 0.65rem;
  color: #d1d5db;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.mono-cell {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.status-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: #34d399;
}

@media (max-width: 960px) {
  .skills-grid,
  .playground-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .skill-items,
  .field-row-2 {
    grid-template-columns: 1fr;
  }
}
</style>

