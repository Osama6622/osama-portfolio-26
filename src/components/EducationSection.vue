<script setup>
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2, Info } from 'lucide-vue-next'
import { educationData, additionalInfo } from '@/data/cvData'
</script>

<template>
  <section id="education" class="section">
    <div class="container">
      <div v-reveal class="section-header">
        <div class="section-eyebrow">
          <span class="section-eyebrow-dot"></span>
          <span>Academic &amp; Professional Credentials</span>
        </div>
        <h2 class="section-title">
          Education &amp; <span class="text-gradient-accent">Certifications</span>
        </h2>
        <p class="section-subtitle">
          Academic foundation in Information Technology paired with specialized frontend nanodegree
          credentials.
        </p>
      </div>

      <div class="edu-grid">
        <article
          v-for="(item, idx) in educationData"
          :key="item.id"
          v-reveal="{ delay: idx * 90, y: 20 }"
          v-spotlight
          class="spotlight-card edu-card"
        >
          <div class="edu-top">
            <div class="edu-icon-wrap" :class="idx === 0 ? 'emerald' : 'cyan'">
              <GraduationCap v-if="idx === 0" :size="22" />
              <Award v-else :size="22" />
            </div>
            <span class="edu-badge">{{ item.badge }}</span>
          </div>

          <span class="edu-type">{{ item.type }}</span>
          <h3 class="edu-degree">{{ item.degree }}</h3>
          <p class="edu-inst">{{ item.institution }}</p>

          <div class="edu-meta-row">
            <span class="edu-meta-item">
              <Calendar :size="13" />
              {{ item.period }}
            </span>
            <span class="edu-meta-item">
              <MapPin :size="13" />
              {{ item.location }}
            </span>
          </div>

          <ul class="edu-highlights">
            <li v-for="(h, hIdx) in item.highlights" :key="hIdx">
              <CheckCircle2 :size="15" class="edu-check" />
              <span>{{ h }}</span>
            </li>
          </ul>
        </article>
      </div>

      <!-- Additional Information Strip -->
      <div v-reveal="{ delay: 180, y: 18 }" v-spotlight class="spotlight-card info-strip">
        <div class="info-strip-title">
          <Info :size="16" class="info-icon" />
          <span>Additional Information</span>
        </div>

        <div class="info-items-grid">
          <div v-for="info in additionalInfo" :key="info.label" class="info-cell">
            <span class="info-label">{{ info.label }}</span>
            <span class="info-val">{{ info.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.edu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.35rem;
  margin-bottom: 1.5rem;
}

.edu-card {
  padding: 2rem;
}

.edu-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.edu-icon-wrap {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edu-icon-wrap.emerald {
  color: #10b981;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.edu-icon-wrap.cyan {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.edu-badge {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 600;
  color: #34d399;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.28);
}

.edu-type {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
}

.edu-degree {
  font-size: 1.28rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.edu-inst {
  font-size: 0.98rem;
  font-weight: 600;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.edu-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.edu-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--text-secondary);
}

.edu-highlights {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.edu-highlights li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.89rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.edu-check {
  color: var(--accent-emerald);
  flex-shrink: 0;
  margin-top: 3px;
}

/* Info Strip */
.info-strip {
  padding: 1.45rem 1.85rem;
}

.info-strip-title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-cyan);
  margin-bottom: 1rem;
}

.info-items-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.info-cell {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.info-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.info-val {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
}

@media (max-width: 900px) {
  .edu-grid {
    grid-template-columns: 1fr;
  }
  .info-items-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 520px) {
  .info-items-grid {
    grid-template-columns: 1fr;
  }
}
</style>

