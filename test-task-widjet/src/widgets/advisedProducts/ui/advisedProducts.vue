<script setup lang="ts">
import { AlertComponent, CartProduct } from '@/shared/ui'
import loadProducts from '../api/loadProducts'
import { reactive, ref } from 'vue'
import type { Iproduct, EcwidProduct } from '@/shared/model'

const status = reactive({
  isLoading: false,
  isLoadingFailed: false
})

const products = ref<Iproduct[]>([])
const errorMsg = ref('')

const loadProductsData = async () => {
  status.isLoading = true
  const workData = await loadProducts()
  if (workData[1]) {
    status.isLoading = false
    status.isLoadingFailed = true
    errorMsg.value = workData[1].message
    return []
  }
  status.isLoading = false
  const products = workData[0]
    .map((item: EcwidProduct) => {
      return {
        id: item.id,
        title: item.name,
        price: item.price,
        image: item.smallThumbnailUrl,
        timestamp: item.updateTimestamp
      }
    })
    .sort((a: Iproduct, b: Iproduct) => b.timestamp - a.timestamp)

  const outputCount: number = JSON.parse(localStorage.getItem('cardsCount') || products.length)

  return products.slice(0, outputCount)
}

async function initializeProducts() {
  products.value = await loadProductsData()
}

initializeProducts()
</script>

<template>
  <div class="catalog">
    <div class="btn-default btn-large btn-loading" v-if="status.isLoading"></div>

    <AlertComponent
      v-else-if="status.isLoadingFailed"
      :title="'Loading error'"
      :text="errorMsg"
      :btn-text="'Try to reload'"
      :btn-function="initializeProducts"
    />

    <div v-else class="advised_products">
      <h2
        :style="{
          'text-align': 'center'
        }"
      >
        Недавно обновленные товары
      </h2>
      <div
        class="list_products"
        :style="{
          display: 'flex',
          'flex-wrap': 'wrap',
          gap: '1rem'
        }"
      >
        <CartProduct
          v-for="product in products"
          :key="product.id"
          :id="product.id"
          :title="product.title"
          :price="product.price"
          :image="product.image"
        />
      </div>
    </div>
  </div>
</template>
