import axios, { AxiosError } from 'axios'
import { storeSettings } from '@/app/stores/storeSettings'
import type { EcwidProduct } from '@/shared/model'

const setProducts = (products: EcwidProduct[]) => {
  const store = storeSettings()
  store.setProducts(products)
}

async function loadProducts() {
  try {
    const config = {
      headers: {
        Authorization: import.meta.env.VITE_AUTHORIZATION_KEY,
        accept: 'application/json'
      }
    }
    console.log(import.meta.env.VITE_AUTHORIZATION_KEY)
    const response = await axios.get(
      `https://app.ecwid.com/api/v3/${import.meta.env.VITE_STORE_ID}/products`,
      config
    )
    setProducts(response.data.items)
    return [response.data.items, '']
  } catch (e: unknown) {
    const error = e as AxiosError
    return [[], error]
  }
}

export default loadProducts
