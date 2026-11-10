<script setup>
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import ContactSection from '@/components/ContactSection.vue'
</script>

<template>
  <div class="portfolio-shell">
    <NavBar />

    <main>
      <HeroSection />
      <div class="section-divider" aria-hidden="true"></div>
      <ExperienceSection />
      <div class="section-divider" aria-hidden="true"></div>
      <ProjectsSection />
      <div class="section-divider" aria-hidden="true"></div>
      <SkillsSection />
      <div class="section-divider" aria-hidden="true"></div>
      <EducationSection />
      <div class="section-divider" aria-hidden="true"></div>
      <ContactSection />
    </main>
  </div>
</template>

<style scoped>
.portfolio-shell {
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
</style>

