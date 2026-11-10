import { createApp } from 'vue'
import App from './App.vue'
import { vReveal, vSpotlight } from './directives/vReveal'
import './assets/main.css'

const app = createApp(App)

app.directive('reveal', vReveal)
app.directive('spotlight', vSpotlight)

app.mount('#app')

