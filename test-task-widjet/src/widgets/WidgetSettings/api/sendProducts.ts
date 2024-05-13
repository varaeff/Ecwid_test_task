import axios, { AxiosError } from 'axios'
import type { EcwidProduct } from '@/shared/model'

async function sendProducts(products: EcwidProduct[]) {
  try {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Disposition': 'attachment; filename="products.csv"'
      }
    }
    const response = await axios.post(import.meta.env.VITE_BACKEND_URL, products, config)
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'products.csv')
    document.body.appendChild(link)
    link.click()
    return false
  } catch (e: unknown) {
    const error = e as AxiosError
    console.log(error)
    return true
  }
}

export default sendProducts
