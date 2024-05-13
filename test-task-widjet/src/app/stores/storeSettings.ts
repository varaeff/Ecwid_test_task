import { defineStore } from 'pinia'
import type { EcwidProduct } from '@/shared/model'

interface StoreState {
  showSettings: boolean
  products: EcwidProduct[]
  exportProductIds: number[]
  showWidget: boolean
}

export const storeSettings = defineStore({
  id: 'app',
  state: () => ({
    showSettings: false,
    products: [],
    exportProductIds: JSON.parse(localStorage.getItem('exportProductIds') || '[]'),
    showWidget: JSON.parse(localStorage.getItem('showWidget') || 'true')
  }),
  actions: {
    setShowSettings(this: StoreState, value: boolean) {
      this.showSettings = value
    },
    setProducts(this: StoreState, value: EcwidProduct[]) {
      this.products = value
    },
    updateExportProductIds(this: StoreState, value: number, adding: boolean) {
      if (adding) {
        this.exportProductIds.push(value)
      } else {
        const index = this.exportProductIds.indexOf(value)
        if (index !== -1) {
          this.exportProductIds.splice(index, 1)
        }
      }
    },
    setShowWidget(this: StoreState, value: boolean) {
      this.showWidget = value
    }
  }
})
