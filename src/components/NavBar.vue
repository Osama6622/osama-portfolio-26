<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Github, Linkedin, Mail, Menu, X, ArrowUpRight, Sparkles } from 'lucide-vue-next'
import { profileData } from '@/data/cvData'

const isScrolled = ref(false)
const scrollProgress = ref(0)
const mobileMenuOpen = ref(false)
const activeSection = ref('hero')

const navLinks = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills & Craft' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
]

const handleScroll = () => {
  const scrollY = window.scrollY
  isScrolled.value = scrollY > 28

  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0

  const sections = ['hero', ...navLinks.map((l) => l.id)]
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i])
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 160) {
        activeSection.value = sections[i]
        break
      }
    }
  }
}

const scrollTo = (id) => {
  mobileMenuOpen.value = false
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="navbar-wrapper no-print" :class="{ scrolled: isScrolled }">
    <!-- Subtle top reading progress line -->
    <div class="scroll-progress-track">
      <div class="scroll-progress-bar" :style="{ width: `${scrollProgress}%` }"></div>
    </div>

    <div class="container navbar-inner">
      <!-- Brand Identity -->
      <a href="#hero" class="brand" @click.prevent="scrollTo('hero')">
        <div class="brand-monogram">
          <span>ON</span>
          <span class="brand-dot"></span>
        </div>
        <div class="brand-text">
          <span class="brand-name">Osama Noshy</span>
          <span class="brand-role">Senior Frontend Engineer</span>
        </div>
      </a>

      <!-- Desktop Navigation Pills -->
      <nav class="nav-pills" aria-label="Primary Navigation">
        <a
          v-for="item in navLinks"
          :key="item.id"
          :href="`#${item.id}`"
          class="nav-link"
          :class="{ active: activeSection === item.id }"
          @click.prevent="scrollTo(item.id)"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Right Actions -->
      <div class="nav-actions">
        <a
          :href="profileData.github"
          target="_blank"
          rel="noopener noreferrer"
          class="icon-btn"
          aria-label="GitHub Profile"
          title="GitHub"
        >
          <Github :size="17" />
        </a>
        <a
          :href="profileData.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="icon-btn"
          aria-label="LinkedIn Profile"
          title="LinkedIn"
        >
          <Linkedin :size="17" />
        </a>
        <a href="#contact" class="nav-cta" @click.prevent="scrollTo('contact')">
          <Sparkles :size="14" />
          <span>Hire Osama</span>
          <ArrowUpRight :size="14" />
        </a>

        <button
          class="mobile-toggle"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle Menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <X v-if="mobileMenuOpen" :size="22" />
          <Menu v-else :size="22" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition name="drawer">
      <div v-if="mobileMenuOpen" class="mobile-drawer">
        <div class="container mobile-drawer-inner">
          <a
            v-for="item in navLinks"
            :key="item.id"
            :href="`#${item.id}`"
            class="mobile-nav-link"
            :class="{ active: activeSection === item.id }"
            @click.prevent="scrollTo(item.id)"
          >
            <span>{{ item.label }}</span>
            <ArrowUpRight :size="16" />
          </a>
          <div class="mobile-drawer-footer">
            <a :href="`mailto:${profileData.email}`" class="btn-primary" style="width: 100%; justify-content: center">
              <Mail :size="16" />
              <span>{{ profileData.email }}</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.1rem 0;
  transition:
    padding 0.35s var(--ease-out-expo),
    background-color 0.35s var(--ease-out-expo),
    border-color 0.35s var(--ease-out-expo),
    backdrop-filter 0.35s var(--ease-out-expo);
  border-bottom: 1px solid transparent;
}

.navbar-wrapper.scrolled {
  padding: 0.75rem 0;
  background: rgba(9, 10, 15, 0.82);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom-color: rgba(255, 255, 255, 0.07);
}

.scroll-progress-track {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-emerald), var(--accent-cyan));
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
  transition: width 0.1s linear;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-monogram {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(56, 189, 248, 0.12));
  border: 1px solid rgba(16, 185, 129, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.88rem;
  color: #ffffff;
  letter-spacing: -0.03em;
  transition: transform 0.3s var(--ease-out-expo), border-color 0.3s ease;
}

.brand:hover .brand-monogram {
  transform: scale(1.05);
  border-color: var(--accent-cyan);
}

.brand-dot {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-emerald);
  border: 2px solid var(--bg-primary);
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.brand-name {
  font-weight: 700;
  font-size: 0.96rem;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.brand-role {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.nav-pills {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.nav-link {
  padding: 0.42rem 0.95rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition:
    color 0.25s ease,
    background-color 0.25s ease;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link.active {
  color: #ffffff;
  background: rgba(16, 185, 129, 0.14);
  box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.3);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s var(--ease-out-expo);
}

.icon-btn:hover {
  color: #ffffff;
  border-color: rgba(56, 189, 248, 0.4);
  transform: translateY(-2px);
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.95rem;
  border-radius: 10px;
  font-size: 0.83rem;
  font-weight: 600;
  color: #06120e;
  background: linear-gradient(135deg, #10b981, #38bdf8);
  transition:
    transform 0.25s var(--ease-out-expo),
    box-shadow 0.25s ease;
}

.nav-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px -6px rgba(16, 185, 129, 0.55);
}

.mobile-toggle {
  display: none;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-drawer {
  background: rgba(12, 14, 22, 0.96);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.25rem 0 1.5rem;
}

.mobile-drawer-inner {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.mobile-nav-link.active {
  color: var(--accent-emerald);
  border-color: rgba(16, 185, 129, 0.35);
  background: rgba(16, 185, 129, 0.08);
}

.mobile-drawer-footer {
  margin-top: 0.75rem;
}

.drawer-enter-active,
.drawer-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s var(--ease-out-expo);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 900px) {
  .nav-pills,
  .nav-cta {
    display: none;
  }
  .mobile-toggle {
    display: inline-flex;
  }
}
</style>

