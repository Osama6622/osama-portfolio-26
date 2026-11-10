<script setup>
import { ref } from 'vue'
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  ArrowUp,
  ExternalLink
} from 'lucide-vue-next'
import { profileData } from '@/data/cvData'

const copiedKey = ref('')
const senderName = ref('')
const senderEmail = ref('')
const senderSubject = ref('Senior Frontend Opportunity')
const senderMessage = ref('')

const copyValue = async (key, text) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key
    setTimeout(() => {
      if (copiedKey.value === key) copiedKey.value = ''
    }, 2200)
  } catch {
    // Fallback
  }
}

const handleSendInquiry = () => {
  const subject = encodeURIComponent(
    `${senderSubject.value}${senderName.value ? ` — from ${senderName.value}` : ''}`
  )
  const body = encodeURIComponent(
    `Hi Osama,\n\n${senderMessage.value || 'I came across your portfolio and would love to discuss a Senior Frontend opportunity.'}\n\nBest regards,\n${senderName.value || ''}\n${senderEmail.value || ''}`
  )
  window.location.href = `mailto:${profileData.email}?subject=${subject}&body=${body}`
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <section id="contact" class="section contact-section">
    <div class="container">
      <div class="contact-grid">
        <!-- Left Column: Direct Channels -->
        <div v-reveal class="contact-info">
          <div class="section-eyebrow">
            <span class="section-eyebrow-dot"></span>
            <span>Let’s Connect</span>
          </div>
          <h2 class="section-title">
            Ready to build <span class="text-gradient-accent">exceptional interfaces</span>?
          </h2>
          <p class="section-subtitle" style="margin-bottom: 2rem">
            Currently based in <strong>Riyadh, Saudi Arabia</strong> and open to discussing Senior
            Frontend Engineering roles, architectural consulting, and ambitious web platforms.
          </p>

          <div class="channel-cards">
            <!-- Email Card -->
            <div v-spotlight class="spotlight-card channel-card">
              <div class="channel-left">
                <div class="channel-icon emerald">
                  <Mail :size="19" />
                </div>
                <div>
                  <span class="channel-label">Email Address</span>
                  <a :href="`mailto:${profileData.email}`" class="channel-value">
                    {{ profileData.email }}
                  </a>
                </div>
              </div>
              <button
                class="copy-chip"
                title="Copy Email"
                @click="copyValue('email', profileData.email)"
              >
                <Check v-if="copiedKey === 'email'" :size="14" style="color: #10b981" />
                <Copy v-else :size="14" />
                <span>{{ copiedKey === 'email' ? 'Copied' : 'Copy' }}</span>
              </button>
            </div>

            <!-- Phone Card -->
            <div v-spotlight class="spotlight-card channel-card">
              <div class="channel-left">
                <div class="channel-icon cyan">
                  <Phone :size="19" />
                </div>
                <div>
                  <span class="channel-label">Mobile Number (KSA)</span>
                  <a :href="`tel:${profileData.phoneRaw}`" class="channel-value">
                    {{ profileData.phone }}
                  </a>
                </div>
              </div>
              <button
                class="copy-chip"
                title="Copy Phone Number"
                @click="copyValue('phone', profileData.phone)"
              >
                <Check v-if="copiedKey === 'phone'" :size="14" style="color: #10b981" />
                <Copy v-else :size="14" />
                <span>{{ copiedKey === 'phone' ? 'Copied' : 'Copy' }}</span>
              </button>
            </div>

            <!-- Location Card -->
            <div v-spotlight class="spotlight-card channel-card">
              <div class="channel-left">
                <div class="channel-icon indigo">
                  <MapPin :size="19" />
                </div>
                <div>
                  <span class="channel-label">Location</span>
                  <span class="channel-value">{{ profileData.location }}</span>
                </div>
              </div>
              <span class="ksa-badge">GMT+3</span>
            </div>
          </div>

          <!-- Social Profiles Row -->
          <div class="social-links-row">
            <a
              :href="profileData.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="social-pill"
            >
              <Linkedin :size="17" />
              <span>linkedin.com/in/osama-nos7y</span>
              <ExternalLink :size="13" />
            </a>
            <a
              :href="profileData.github"
              target="_blank"
              rel="noopener noreferrer"
              class="social-pill"
            >
              <Github :size="17" />
              <span>github.com/Osama6622</span>
              <ExternalLink :size="13" />
            </a>
          </div>
        </div>

        <!-- Right Column: Quick Message Composer -->
        <div v-reveal="{ delay: 120, y: 22 }" class="contact-form-wrap no-print">
          <form v-spotlight class="spotlight-card contact-form" @submit.prevent="handleSendInquiry">
            <h3 class="form-title">Send a Direct Inquiry</h3>
            <p class="form-sub">
              Fill out the details below to launch a pre-formatted email directly to
              <code>{{ profileData.email }}</code>.
            </p>

            <div class="form-row-2">
              <div class="form-group">
                <label for="sender-name">Your Name</label>
                <input
                  id="sender-name"
                  v-model="senderName"
                  type="text"
                  placeholder="e.g. Sarah Al-Otaibi"
                />
              </div>
              <div class="form-group">
                <label for="sender-email">Your Email</label>
                <input
                  id="sender-email"
                  v-model="senderEmail"
                  type="email"
                  placeholder="sarah@company.com"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="sender-subject">Topic / Role</label>
              <select id="sender-subject" v-model="senderSubject">
                <option value="Senior Frontend Opportunity">Senior Frontend Opportunity</option>
                <option value="Frontend Architecture & Consulting">
                  Frontend Architecture &amp; Consulting
                </option>
                <option value="Project Collaboration">Project Collaboration</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div class="form-group">
              <label for="sender-msg">Message</label>
              <textarea
                id="sender-msg"
                v-model="senderMessage"
                rows="4"
                placeholder="Tell Osama about your team, project, or timeline..."
              ></textarea>
            </div>

            <button type="submit" class="btn-primary form-submit">
              <Send :size="16" />
              <span>Compose &amp; Send Email</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Footer Bottom Bar -->
      <footer class="footer-bar">
        <div class="footer-left">
          <span class="footer-brand">Osama Noshy Ahmed</span>
          <span class="footer-sep">·</span>
          <span class="footer-copy">
            Senior Frontend Developer · Built with Vue 3 &amp; Vite
          </span>
        </div>

        <button class="back-top-btn no-print" title="Scroll to top" @click="scrollToTop">
          <span>Back to Top</span>
          <ArrowUp :size="15" />
        </button>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding-bottom: 3rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 2.5rem;
  align-items: start;
  margin-bottom: 5rem;
}

.channel-cards {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 1.5rem;
}

.channel-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.05rem 1.25rem;
}

.channel-left {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.channel-icon {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.channel-icon.emerald {
  color: #10b981;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.channel-icon.cyan {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
}
.channel-icon.indigo {
  color: #818cf8;
  background: rgba(129, 140, 248, 0.12);
  border: 1px solid rgba(129, 140, 248, 0.3);
}

.channel-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.channel-value {
  font-size: 0.96rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: color 0.2s ease;
}

a.channel-value:hover {
  color: var(--accent-emerald);
}

.copy-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.38rem 0.75rem;
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 0.73rem;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  transition: all 0.2s ease;
}

.copy-chip:hover {
  color: #ffffff;
  border-color: rgba(16, 185, 129, 0.4);
}

.ksa-badge {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
}

.social-links-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.social-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem 1.05rem;
  border-radius: 12px;
  font-size: 0.84rem;
  font-weight: 600;
  color: #d1d5db;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.25s ease;
}

.social-pill:hover {
  color: #ffffff;
  border-color: var(--accent-cyan);
  transform: translateY(-2px);
}

/* Contact Form */
.contact-form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.form-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-primary);
}

.form-sub {
  font-size: 0.86rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.form-sub code {
  font-family: var(--font-mono);
  color: var(--accent-emerald);
  font-size: 0.8rem;
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-secondary);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.72rem 0.95rem;
  border-radius: 10px;
  font-family: var(--font-sans);
  font-size: 0.88rem;
  color: var(--text-primary);
  background: rgba(9, 10, 15, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
  outline: none;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--accent-emerald);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

.form-submit {
  width: 100%;
  justify-content: center;
  margin-top: 0.35rem;
}

/* Footer */
.footer-bar {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.footer-left {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.86rem;
}

.footer-brand {
  font-weight: 700;
  color: var(--text-primary);
}

.footer-sep {
  color: var(--text-muted);
}

.footer-copy {
  color: var(--text-secondary);
}

.back-top-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.95rem;
  border-radius: 10px;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.25s ease;
}

.back-top-btn:hover {
  color: #ffffff;
  border-color: var(--accent-emerald);
  transform: translateY(-2px);
}

@media (max-width: 960px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .form-row-2 {
    grid-template-columns: 1fr;
  }
}
</style>

