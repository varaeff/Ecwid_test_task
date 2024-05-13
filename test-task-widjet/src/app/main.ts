import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/app/App.vue'

// @ts-ignore
Ecwid.OnPageLoaded.add(function (page: any) {
  if (page.type === 'CART') {
    const parentElement = document.querySelector('.ec-store__content-wrapper') as HTMLElement
    if (parentElement) {
      parentElement.style.display = 'flex'
      parentElement.style.flexDirection = 'column'
    }

    const shadowHost = document.createElement('div')
    shadowHost.style.order = '2'

    const footer = document.querySelector('.ec-footer') as HTMLElement
    if (footer) footer.style.order = '3'

    shadowHost.setAttribute('class', 'widget')
    parentElement?.appendChild(shadowHost)
    const shadowRoot = shadowHost.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.setAttribute('class', 'widget_container')

    const css = document.createElement('link')
    css.setAttribute(
      'href',
      'https://d35z3p2poghz10.cloudfront.net/ecwid-sdk/css/1.3.19/ecwid-app-ui.css'
    )
    css.setAttribute('rel', 'stylesheet')

    shadowRoot.appendChild(css)
    shadowRoot.appendChild(container)

    const app = createApp(App)
    app.use(createPinia())
    app.mount(container)
  }
})
