<script setup>
import { ref } from 'vue'
import { Briefcase, MapPin, Calendar, Layers, CheckCircle2, Sparkles } from 'lucide-vue-next'
import { experiences } from '@/data/cvData'

const selectedCompanyId = ref('all')

const filteredExperiences = () => {
  if (selectedCompanyId.value === 'all') return experiences
  return experiences.filter((exp) => exp.id === selectedCompanyId.value)
}
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <div class="experience-header-row">
        <div v-reveal class="section-header" style="margin-bottom: 0">
          <div class="section-eyebrow">
            <span class="section-eyebrow-dot"></span>
            <span>Career Trajectory</span>
          </div>
          <h2 class="section-title">
            Professional <span class="text-gradient-accent">Experience</span>
          </h2>
          <p class="section-subtitle">
            Over 4 years delivering high-impact government portals, national super-app integrations,
            financial accounting systems, and global telecom platforms.
          </p>
        </div>

        <!-- Interactive Company Filter Bar -->
        <div v-reveal="{ delay: 100 }" class="company-filter no-print" role="tablist">
          <button
            class="filter-chip"
            :class="{ active: selectedCompanyId === 'all' }"
            @click="selectedCompanyId = 'all'"
          >
            All Roles ({{ experiences.length }})
          </button>
          <button
            v-for="exp in experiences"
            :key="exp.id"
            class="filter-chip"
            :class="{ active: selectedCompanyId === exp.id }"
            @click="selectedCompanyId = exp.id"
          >
            <span v-if="exp.current" class="live-dot"></span>
            {{ exp.shortCompany }}
          </button>
        </div>
      </div>

      <!-- Timeline List -->
      <div class="timeline-wrapper">
        <div class="timeline-rail" aria-hidden="true"></div>

        <TransitionGroup name="timeline-list" tag="div" class="timeline-items">
          <div
            v-for="(job, index) in filteredExperiences()"
            :key="job.id"
            v-reveal="{ delay: index * 80, y: 20 }"
            class="timeline-row"
          >
            <!-- Timeline Node Indicator (Centered on the vertical rail & card) -->
            <div class="timeline-axis" aria-hidden="true">
              <div class="timeline-node" :style="{ '--node-color': job.accent }">
                <span class="timeline-node-inner"></span>
              </div>
              <span class="timeline-connector" :style="{ '--node-color': job.accent }"></span>
            </div>

            <article v-spotlight class="spotlight-card timeline-card">
              <div class="job-header">
              <div class="job-title-group">
                <div class="job-badges">
                  <span v-if="job.current" class="badge-current">
                    <span class="badge-current-dot"></span>
                    Current Role
                  </span>
                  <span class="badge-domain">{{ job.domain }}</span>
                </div>

                <h3 class="job-role">{{ job.role }}</h3>
                <div class="job-company-row">
                  <Briefcase :size="16" class="company-icon" :style="{ color: job.accent }" />
                  <span class="job-company">{{ job.company }}</span>
                </div>
              </div>

              <div class="job-meta">
                <div class="meta-pill">
                  <Calendar :size="14" />
                  <span>{{ job.period }}</span>
                </div>
                <div class="meta-pill">
                  <MapPin :size="14" />
                  <span>{{ job.location }}</span>
                </div>
              </div>
            </div>

            <p class="job-summary">{{ job.summary }}</p>

            <!-- Selected Project Experience Callout -->
            <div class="selected-projects-box">
              <div class="sp-label">
                <Sparkles :size="14" :style="{ color: job.accent }" />
                <span>Selected Project Experience</span>
              </div>
              <div class="sp-chips">
                <span
                  v-for="proj in job.selectedProjects"
                  :key="proj"
                  class="sp-chip"
                  :style="{ borderColor: `${job.accent}40` }"
                >
                  {{ proj }}
                </span>
              </div>
            </div>

            <!-- Key Engineering Contributions -->
            <ul class="job-highlights">
              <li v-for="(point, pIdx) in job.highlights" :key="pIdx" class="highlight-item">
                <CheckCircle2 :size="16" class="highlight-icon" :style="{ color: job.accent }" />
                <span>{{ point }}</span>
              </li>
            </ul>

            <!-- Tools & Tech Stack Row -->
            <div class="job-tools">
              <span class="tools-label">
                <Layers :size="13" />
                <span>Tools &amp; Stack:</span>
              </span>
              <div class="tools-list">
                <span v-for="tool in job.tools" :key="tool" class="tech-pill">
                  {{ tool }}
                </span>
              </div>
            </div>
            </article>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-header-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 3.5rem;
}

.company-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding: 0.35rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.48rem 0.9rem;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: all 0.25s ease;
}

.filter-chip:hover {
  color: var(--text-primary);
}

.filter-chip.active {
  color: #ffffff;
  background: rgba(16, 185, 129, 0.15);
  box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.35);
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-emerald);
  box-shadow: 0 0 8px var(--accent-emerald);
}

.timeline-wrapper {
  position: relative;
  --axis-width: 44px;
}

.timeline-rail {
  position: absolute;
  top: 1.5rem;
  bottom: 1.5rem;
  left: calc(var(--axis-width) / 2);
  transform: translateX(-50%);
  width: 2px;
  background: linear-gradient(
    180deg,
    var(--accent-emerald) 0%,
    var(--accent-cyan) 50%,
    rgba(255, 255, 255, 0.08) 100%
  );
  border-radius: 999px;
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 1.85rem;
}

.timeline-row {
  display: grid;
  grid-template-columns: var(--axis-width) 1fr;
  align-items: center;
}

.timeline-axis {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-node {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--bg-primary);
  border: 2px solid var(--node-color, var(--accent-emerald));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 0 4px var(--bg-primary),
    0 0 16px rgba(16, 185, 129, 0.4);
  z-index: 2;
  transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s ease;
}

.timeline-row:hover .timeline-node {
  transform: scale(1.15);
  box-shadow:
    0 0 0 4px var(--bg-primary),
    0 0 22px var(--node-color, var(--accent-emerald));
}

.timeline-node-inner {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--node-color, var(--accent-emerald));
}

.timeline-connector {
  position: absolute;
  left: 50%;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--node-color, var(--accent-emerald)), rgba(255, 255, 255, 0.08));
  opacity: 0.55;
  z-index: 1;
}

.timeline-card {
  position: relative;
  padding: 2rem 2.15rem;
}

.job-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.25rem;
  margin-bottom: 1.15rem;
}

.job-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.55rem;
}

.badge-current {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  color: #34d399;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.badge-current-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

.badge-domain {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-secondary);
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.job-role {
  font-size: 1.38rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.job-company-row {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #d1d5db;
}

.job-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
}

.meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.32rem 0.75rem;
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.job-summary {
  font-size: 0.96rem;
  color: #d1d5db;
  line-height: 1.68;
  margin-bottom: 1.25rem;
}

.selected-projects-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.05rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  margin-bottom: 1.35rem;
}

.sp-label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sp-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.sp-chip {
  padding: 0.25rem 0.7rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.job-highlights {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 1.5rem;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.62;
}

.highlight-icon {
  flex-shrink: 0;
  margin-top: 4px;
}

.job-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  padding-top: 1.15rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.tools-label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-muted);
}

.tools-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.timeline-list-enter-active,
.timeline-list-leave-active {
  transition: all 0.35s var(--ease-out-expo);
}
.timeline-list-enter-from,
.timeline-list-leave-to {
  opacity: 0;
  transform: translateY(14px);
}

@media (max-width: 768px) {
  .timeline-wrapper {
    --axis-width: 32px;
  }
  .timeline-card {
    padding: 1.4rem 1.3rem;
  }
  .job-meta {
    align-items: flex-start;
  }
}
</style>

