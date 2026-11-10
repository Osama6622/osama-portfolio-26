/**
 * Smooth, hardware-accelerated IntersectionObserver scroll reveal directive.
 * Usage:
 *   v-reveal
 *   v-reveal="{ delay: 120, y: 20, scale: 0.98 }"
 */
export const vReveal = {
  mounted(el, binding) {
    const options = typeof binding.value === 'object' && binding.value !== null ? binding.value : {}
    const delay = typeof binding.value === 'number' ? binding.value : (options.delay ?? 0)
    const y = options.y ?? 22
    const x = options.x ?? 0
    const scale = options.scale ?? 0.985
    const duration = options.duration ?? 780

    el.style.opacity = '0'
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    el.style.willChange = 'opacity, transform'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translate3d(0, 0, 0) scale(1)'
            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    observer.observe(el)
    el._revealObserver = observer
  },
  unmounted(el) {
    if (el._revealObserver) {
      el._revealObserver.disconnect()
    }
  }
}

/**
 * Subtle cursor-tracked radial glow on dark glass cards.
 * Sets --mouse-x and --mouse-y CSS variables on mousemove.
 */
export const vSpotlight = {
  mounted(el) {
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--mouse-x', `${x}px`)
      el.style.setProperty('--mouse-y', `${y}px`)
    }
    el.addEventListener('mousemove', handleMove, { passive: true })
    el._spotlightHandler = handleMove
  },
  unmounted(el) {
    if (el._spotlightHandler) {
      el.removeEventListener('mousemove', el._spotlightHandler)
    }
  }
}

