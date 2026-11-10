<script setup>
import { ref } from 'vue'
import {
  MapPin,
  ArrowRight,
  Terminal,
  Sparkles,
  CheckCircle2,
  Building2,
  Code2,
  Download,
  Copy,
  Check
} from 'lucide-vue-next'
import { profileData } from '@/data/cvData'

const activeTab = ref('profile')
const copiedEmail = ref(false)

const consoleTabs = [
  { id: 'profile', label: 'engineer.profile.ts' },
  { id: 'portals', label: 'national-portals.json' },
  { id: 'architecture', label: 'ui-craft.config.js' }
]

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profileData.email)
    copiedEmail.value = true
    setTimeout(() => {
      copiedEmail.value = false
    }, 2400)
  } catch {
    window.location.href = `mailto:${profileData.email}`
  }
}
</script>

<template>
  <section id="hero" class="hero-section">
    <!-- Ambient Background Glows & Architectural Grid -->
    <div class="hero-ambient" aria-hidden="true">
      <div class="orb orb-emerald"></div>
      <div class="orb orb-cyan"></div>
      <div class="hero-grid-mask"></div>
    </div>

    <div class="container hero-container">
      <div class="hero-grid">
        <!-- Left Column: Narrative & CTAs -->
        <div class="hero-content">
          <div v-reveal="{ delay: 40, y: 16 }" class="status-pill">
            <span class="status-pulse"></span>
            <MapPin :size="13" class="status-icon" />
            <span>{{ profileData.location }} · Senior Frontend @ NCGR</span>
          </div>

          <h1 v-reveal="{ delay: 110, y: 20 }" class="hero-title">
            Hi, I’m <span class="text-gradient">Osama Noshy</span>.<br />
            <span class="hero-title-sub">
              Senior Frontend Engineer crafting
              <span class="text-gradient-accent">mission-critical</span> web platforms.
            </span>
          </h1>

          <p v-reveal="{ delay: 180, y: 20 }" class="hero-description">
            {{ profileData.objective }}
          </p>

          <!-- Core Stack Strip -->
          <div v-reveal="{ delay: 240, y: 18 }" class="hero-stack-row">
            <span class="stack-label">Core Stack</span>
            <div class="stack-chips">
              <span v-for="tech in profileData.coreStack" :key="tech" class="tech-pill">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Primary CTAs -->
          <div v-reveal="{ delay: 300, y: 18 }" class="hero-actions no-print">
            <a href="#projects" class="btn-primary">
              <span>Explore Flagship Work</span>
              <ArrowRight :size="17" />
            </a>

            <button class="btn-secondary" @click="copyEmail">
              <Check v-if="copiedEmail" :size="16" style="color: var(--accent-emerald)" />
              <Copy v-else :size="16" />
              <span>{{ copiedEmail ? 'Email Copied!' : profileData.email }}</span>
            </button>

            <a
              href="/Osama-Noshy-Maher-CV.pdf"
              download="Osama-Noshy-Maher-CV.pdf"
              class="btn-ghost"
              title="Download Osama Noshy Maher CV (PDF)"
            >
              <Download :size="16" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        <!-- Right Column: Interactive Engineering Console -->
        <div v-reveal="{ delay: 200, y: 26, scale: 0.97 }" class="hero-visual">
          <div v-spotlight class="spotlight-card console-card">
            <!-- Window Top Bar -->
            <div class="console-header">
              <div class="window-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-amber"></span>
                <span class="dot dot-green"></span>
              </div>
              <div class="console-tabs">
                <button
                  v-for="tab in consoleTabs"
                  :key="tab.id"
                  class="console-tab"
                  :class="{ active: activeTab === tab.id }"
                  @click="activeTab = tab.id"
                >
                  <Terminal :size="12" />
                  <span>{{ tab.label }}</span>
                </button>
              </div>
            </div>

            <!-- Interactive Console Content -->
            <div class="console-body">
              <Transition name="fade-slide" mode="out-in">
                <!-- Tab 1: Engineer Profile -->
                <div v-if="activeTab === 'profile'" key="profile" class="code-block">
                  <div class="code-line">
                    <span class="ln">01</span>
                    <span class="kw">export const</span> <span class="id">seniorEngineer</span> = &#123;
                  </div>
                  <div class="code-line">
                    <span class="ln">02</span>
                    &nbsp;&nbsp;<span class="prop">name</span>:
                    <span class="str">'Osama Noshy Maher'</span>,
                  </div>
                  <div class="code-line">
                    <span class="ln">03</span>
                    &nbsp;&nbsp;<span class="prop">title</span>:
                    <span class="str">'Senior Frontend Developer'</span>,
                  </div>
                  <div class="code-line">
                    <span class="ln">04</span>
                    &nbsp;&nbsp;<span class="prop">location</span>:
                    <span class="str">'Riyadh, Saudi Arabia'</span>,
                  </div>
                  <div class="code-line">
                    <span class="ln">05</span>
                    &nbsp;&nbsp;<span class="prop">currentRole</span>:
                    <span class="str">'NCGR (Etimad &amp; Debt Mgmt)'</span>,
                  </div>
                  <div class="code-line">
                    <span class="ln">06</span>
                    &nbsp;&nbsp;<span class="prop">primaryEcosystem</span>: [
                    <span class="str">'Vue.js'</span>, <span class="str">'Angular'</span>,
                    <span class="str">'Vitest'</span> ],
                  </div>
                  <div class="code-line">
                    <span class="ln">07</span>
                    &nbsp;&nbsp;<span class="prop">styling</span>: [
                    <span class="str">'TailwindCSS'</span>, <span class="str">'Sass'</span>,
                    <span class="str">'Design Systems'</span> ],
                  </div>
                  <div class="code-line">
                    <span class="ln">08</span>
                    &nbsp;&nbsp;<span class="prop">status</span>:
                    <span class="bool">true</span> <span class="cm">// Ready for high-impact challenges</span>
                  </div>
                  <div class="code-line"><span class="ln">09</span>&#125;;</div>
                </div>

                <!-- Tab 2: National & Global Platforms -->
                <div v-else-if="activeTab === 'portals'" key="portals" class="portal-showcase">
                  <div class="portal-item">
                    <div class="portal-badge emerald">NCGR · KSA</div>
                    <div class="portal-info">
                      <h4>Etimad Portals &amp; Debt Management</h4>
                      <p>Vue.js, Angular, Sass &amp; Vitest architecture for national financial systems.</p>
                    </div>
                  </div>
                  <div class="portal-item">
                    <div class="portal-badge cyan">Link Dev</div>
                    <div class="portal-info">
                      <h4>Monshaat Portals &amp; Tawakkalna App</h4>
                      <p>High-scale SME portals &amp; super-app services with Vue.js, Drupal &amp; Twig.</p>
                    </div>
                  </div>
                  <div class="portal-item">
                    <div class="portal-badge amber">Huawei</div>
                    <div class="portal-info">
                      <h4>Global CEM, Converge &amp; Orange/Etisalat GIS</h4>
                      <p>2G/3G/4G geospatial site mapping, auto-diagnostics &amp; carrier dashboards.</p>
                    </div>
                  </div>
                </div>

                <!-- Tab 3: UI Craft & Component Architecture -->
                <div v-else key="architecture" class="arch-list">
                  <div class="arch-row">
                    <CheckCircle2 :size="16" class="arch-icon" />
                    <div>
                      <strong>Reusable Design Systems</strong>
                      <p>Engineered custom InputText, DatePicker, TableList, RadioButton &amp; BasicSelect kits.</p>
                    </div>
                  </div>
                  <div class="arch-row">
                    <Code2 :size="16" class="arch-icon" />
                    <div>
                      <strong>Unit-Tested Reliability</strong>
                      <p>Automated component and state verification using Vitest &amp; modern Vite pipelines.</p>
                    </div>
                  </div>
                  <div class="arch-row">
                    <Building2 :size="16" class="arch-icon" />
                    <div>
                      <strong>Cross-Functional Leadership</strong>
                      <p>Led frontend squads, authored UAT test suites, and aligned directly with stakeholders.</p>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Console Footer Bar -->
            <div class="console-footer">
              <span class="footer-indicator">
                <Sparkles :size="13" />
                <span>Interactive Architecture Overview</span>
              </span>
              <span class="footer-branch">main · v3.5+ · UTF-8</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Metrics Ribbon -->
      <div v-reveal="{ delay: 340, y: 22 }" class="metrics-ribbon">
        <div
          v-for="metric in profileData.metrics"
          :key="metric.label"
          v-spotlight
          class="spotlight-card metric-card"
        >
          <div class="metric-value">
            <span>{{ metric.value }}</span>
            <span class="metric-suffix">{{ metric.suffix }}</span>
          </div>
          <div class="metric-label">{{ metric.label }}</div>
          <div class="metric-detail">{{ metric.detail }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  padding: 9.5rem 0 5rem;
  overflow: hidden;
}

.hero-ambient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(110px);
  animation: pulseGlow 9s ease-in-out infinite;
}

.orb-emerald {
  top: -10%;
  left: 8%;
  width: 460px;
  height: 460px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 70%);
}

.orb-cyan {
  top: 12%;
  right: 5%;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.13) 0%, transparent 70%);
  animation-delay: -4.5s;
}

.hero-grid-mask {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.028) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.028) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 80% 65% at 50% 35%, #000 35%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 65% at 50% 35%, #000 35%, transparent 100%);
}

.hero-container {
  position: relative;
  z-index: 1;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 3rem;
  align-items: center;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.42rem 0.95rem;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 500;
  color: #d1fae5;
  margin-bottom: 1.5rem;
}

.status-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-emerald);
  box-shadow: 0 0 12px var(--accent-emerald);
}

.status-icon {
  color: var(--accent-emerald);
}

.hero-title {
  font-size: clamp(2.35rem, 4.6vw, 3.75rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.1;
  margin-bottom: 1.35rem;
}

.hero-title-sub {
  display: block;
  margin-top: 0.35rem;
  font-size: clamp(1.55rem, 2.8vw, 2.25rem);
  font-weight: 700;
  color: #e5e7eb;
  line-height: 1.22;
}

.hero-description {
  font-size: 1.04rem;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 1.75rem;
  max-width: 630px;
}

.hero-stack-row {
  margin-bottom: 2rem;
}

.stack-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-bottom: 0.65rem;
}

.stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.8rem 1.05rem;
  border-radius: 12px;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-secondary);
  border: 1px solid transparent;
  transition:
    color 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease;
}

.btn-ghost:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.09);
}

/* Console Card */
.console-card {
  border-radius: 20px;
  background: rgba(14, 17, 26, 0.84);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 30px 60px -25px rgba(0, 0, 0, 0.85);
}

.console-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1.15rem;
  background: rgba(255, 255, 255, 0.025);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  overflow-x: auto;
}

.window-dots {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot-red {
  background: #ef4444;
  opacity: 0.8;
}
.dot-amber {
  background: #f59e0b;
  opacity: 0.8;
}
.dot-green {
  background: #10b981;
  opacity: 0.8;
}

.console-tabs {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.console-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
  padding: 0.34rem 0.68rem;
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-secondary);
  background: transparent;
  border: 1px solid transparent;
  white-space: nowrap;
  transition: all 0.22s ease;
}

.console-tab:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
}

.console-tab.active {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.28);
}

.console-body {
  padding: 1.4rem 1.35rem;
  min-height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.code-block {
  font-family: var(--font-mono);
  font-size: 0.81rem;
  line-height: 1.85;
}

.code-line {
  display: flex;
  align-items: baseline;
  white-space: pre-wrap;
  word-break: break-word;
}

.ln {
  color: #4b5563;
  user-select: none;
  margin-right: 1rem;
  font-size: 0.73rem;
  min-width: 18px;
}

.kw {
  color: #c084fc;
}
.id {
  color: #38bdf8;
}
.prop {
  color: #e5e7eb;
}
.str {
  color: #34d399;
}
.bool {
  color: #f59e0b;
}
.cm {
  color: #6b7280;
  font-style: italic;
}

.portal-showcase {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.portal-item {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 0.75rem 0.9rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.portal-badge {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
  white-space: nowrap;
}

.portal-badge.emerald {
  color: #34d399;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.portal-badge.cyan {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
}
.portal-badge.amber {
  color: #fbbf24;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.portal-info h4 {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.15rem;
}

.portal-info p {
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.arch-list {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.arch-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.arch-icon {
  color: var(--accent-emerald);
  flex-shrink: 0;
  margin-top: 2px;
}

.arch-row strong {
  display: block;
  font-size: 0.87rem;
  color: var(--text-primary);
  margin-bottom: 0.15rem;
}

.arch-row p {
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.console-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1.15rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
}

.footer-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--accent-emerald);
}

/* Metrics Ribbon */
.metrics-ribbon {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.15rem;
}

.metric-card {
  padding: 1.45rem 1.5rem;
}

.metric-value {
  font-size: 2.15rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 0.35rem;
}

.metric-suffix {
  font-size: 1.35rem;
  color: var(--accent-emerald);
  margin-left: 2px;
}

.metric-label {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
}

.metric-detail {
  font-size: 0.78rem;
  color: var(--text-secondary);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s var(--ease-out-expo);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .metrics-ribbon {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .hero-section {
    padding-top: 7.5rem;
  }
  .metrics-ribbon {
    grid-template-columns: 1fr;
  }
}
</style>

