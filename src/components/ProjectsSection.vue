<script setup>
import { ref, computed } from 'vue'
import {
  ExternalLink,
  Layers,
  CheckCircle2,
  X,
  Building2,
  Calendar,
  ArrowUpRight,
  Sparkles
} from 'lucide-vue-next'
import { projects } from '@/data/cvData'

const activeCategory = ref('All')
const selectedProject = ref(null)

const categories = ['All', 'GovTech & Enterprise', 'Telecom & GIS', 'FinTech & SaaS']

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return projects
  return projects.filter((p) => p.category === activeCategory.value)
})

const openModal = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProject.value = null
  document.body.style.overflow = ''
}
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="projects-header-row">
        <div v-reveal class="section-header" style="margin-bottom: 0">
          <div class="section-eyebrow">
            <span class="section-eyebrow-dot"></span>
            <span>Selected Works</span>
          </div>
          <h2 class="section-title">
            Flagship <span class="text-gradient-accent">Projects &amp; Platforms</span>
          </h2>
          <p class="section-subtitle">
            From national Saudi government portals and telecom GIS maps to commodity intelligence
            dashboards and enterprise accounting suites.
          </p>
        </div>

        <!-- Category Filter Tabs -->
        <div v-reveal="{ delay: 100 }" class="category-tabs no-print" role="tablist">
          <button
            v-for="cat in categories"
            :key="cat"
            class="cat-tab"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Projects Bento Grid -->
      <TransitionGroup name="project-grid" tag="div" class="projects-grid">
        <article
          v-for="(project, idx) in filteredProjects"
          :key="project.id"
          v-reveal="{ delay: (idx % 3) * 70, y: 20 }"
          v-spotlight
          class="spotlight-card project-card"
          :class="{ 'featured-span': project.featured && activeCategory === 'All' && idx < 2 }"
          @click="openModal(project)"
        >
          <!-- Top Accent Bar -->
          <div class="card-top-bar" :style="{ background: project.accent }"></div>

          <div class="project-card-body">
            <div class="project-meta-top">
              <span class="project-category" :style="{ color: project.accent }">
                {{ project.category }}
              </span>
              <span class="project-org">{{ project.organization }}</span>
            </div>

            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-subtitle">{{ project.subtitle }}</p>

            <div class="project-metric-banner">
              <Sparkles :size="13" :style="{ color: project.accent }" />
              <span>{{ project.metrics }}</span>
            </div>

            <p class="project-desc">{{ project.description }}</p>

            <ul class="project-Mini-points">
              <li v-for="(item, cIdx) in project.contributions.slice(0, 2)" :key="cIdx">
                <CheckCircle2 :size="14" class="mini-check" :style="{ color: project.accent }" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="project-card-footer">
            <div class="project-tech-row">
              <span v-for="t in project.tech.slice(0, 4)" :key="t" class="tech-pill">
                {{ t }}
              </span>
              <span v-if="project.tech.length > 4" class="tech-pill">
                +{{ project.tech.length - 4 }}
              </span>
            </div>

            <div class="project-actions">
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="live-link-btn"
                title="Visit Live Production Website"
                @click.stop
              >
                <span>Live Site</span>
                <ExternalLink :size="13" />
              </a>
              <button class="inspect-btn" @click.stop="openModal(project)">
                <span>Case Study</span>
                <ArrowUpRight :size="14" />
              </button>
            </div>
          </div>
        </article>
      </TransitionGroup>
    </div>

    <!-- Interactive Case Study Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="selectedProject" class="modal-backdrop" @click.self="closeModal">
          <div class="modal-panel" role="dialog" aria-modal="true">
            <div class="modal-accent-line" :style="{ background: selectedProject.accent }"></div>

            <div class="modal-header">
              <div>
                <div class="modal-badges">
                  <span class="modal-cat" :style="{ color: selectedProject.accent }">
                    {{ selectedProject.category }}
                  </span>
                  <span class="modal-meta-chip">
                    <Building2 :size="13" />
                    {{ selectedProject.organization }}
                  </span>
                  <span class="modal-meta-chip">
                    <Calendar :size="13" />
                    {{ selectedProject.period }}
                  </span>
                </div>
                <h3 class="modal-title">{{ selectedProject.title }}</h3>
                <p class="modal-subtitle">{{ selectedProject.subtitle }}</p>
              </div>

              <button class="modal-close" aria-label="Close modal" @click="closeModal">
                <X :size="20" />
              </button>
            </div>

            <div class="modal-body">
              <div class="modal-overview-box">
                <h4>Project Overview</h4>
                <p>{{ selectedProject.description }}</p>
              </div>

              <div class="modal-section">
                <h4>Key Engineering Contributions &amp; Impact</h4>
                <ul class="modal-contributions">
                  <li v-for="(item, idx) in selectedProject.contributions" :key="idx">
                    <CheckCircle2
                      :size="17"
                      class="modal-check"
                      :style="{ color: selectedProject.accent }"
                    />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <div class="modal-section">
                <h4>
                  <Layers :size="15" />
                  <span>Technologies &amp; Architecture</span>
                </h4>
                <div class="modal-tech-pills">
                  <span v-for="t in selectedProject.tech" :key="t" class="tech-pill">
                    {{ t }}
                  </span>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <a
                v-if="selectedProject.liveUrl"
                :href="selectedProject.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary"
              >
                <span>Open Live Website ({{ selectedProject.liveUrl }})</span>
                <ExternalLink :size="15" />
              </a>
              <button class="btn-secondary" @click="closeModal">Close View</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.projects-header-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.35rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.cat-tab {
  padding: 0.48rem 0.95rem;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: all 0.25s ease;
}

.cat-tab:hover {
  color: var(--text-primary);
}

.cat-tab.active {
  color: #ffffff;
  background: rgba(16, 185, 129, 0.15);
  box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.35);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.35rem;
}

.project-card {
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.project-card.featured-span {
  grid-column: span 6;
}

.card-top-bar {
  height: 3px;
  width: 100%;
  opacity: 0.75;
}

.project-card-body {
  padding: 1.75rem 1.85rem 1.25rem;
}

.project-meta-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.project-category {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.project-org {
  font-family: var(--font-mono);
  font-size: 0.73rem;
  color: var(--text-muted);
}

.project-title {
  font-size: 1.32rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.project-subtitle {
  font-size: 0.86rem;
  font-weight: 500;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.project-metric-banner {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.75rem;
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: #e5e7eb;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.07);
  margin-bottom: 1rem;
}

.project-desc {
  font-size: 0.91rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 1.15rem;
}

.project-Mini-points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.project-Mini-points li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 0.84rem;
  color: #d1d5db;
  line-height: 1.5;
}

.mini-check {
  flex-shrink: 0;
  margin-top: 3px;
}

.project-card-footer {
  padding: 1.1rem 1.85rem 1.45rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
}

.project-tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.38rem;
}

.project-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.live-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.38rem 0.75rem;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #34d399;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
  transition: all 0.2s ease;
}

.live-link-btn:hover {
  background: rgba(16, 185, 129, 0.22);
}

.inspect-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.38rem 0.75rem;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.inspect-btn:hover {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(5, 6, 10, 0.82);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-panel {
  width: 100%;
  max-width: 680px;
  max-height: 88vh;
  overflow-y: auto;
  background: #111420;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.9);
}

.modal-accent-line {
  height: 4px;
  width: 100%;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.75rem 2rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.modal-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.65rem;
}

.modal-cat {
  font-family: var(--font-mono);
  font-size: 0.73rem;
  font-weight: 600;
  text-transform: uppercase;
}

.modal-meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.73rem;
  color: var(--text-secondary);
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
}

.modal-subtitle {
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.modal-close {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-close:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.modal-body {
  padding: 1.65rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.modal-overview-box {
  padding: 1.1rem 1.25rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.modal-overview-box h4,
.modal-section h4 {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.85rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-primary);
  margin-bottom: 0.65rem;
}

.modal-overview-box p {
  font-size: 0.94rem;
  color: var(--text-secondary);
  line-height: 1.65;
}

.modal-contributions {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.modal-contributions li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.92rem;
  color: #d1d5db;
  line-height: 1.6;
}

.modal-check {
  flex-shrink: 0;
  margin-top: 3px;
}

.modal-tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.modal-footer {
  padding: 1.25rem 2rem 1.65rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
}

.project-grid-enter-active,
.project-grid-leave-active {
  transition: all 0.35s var(--ease-out-expo);
}
.project-grid-enter-from,
.project-grid-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(12px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 960px) {
  .project-card,
  .project-card.featured-span {
    grid-column: span 12;
  }
}
</style>

