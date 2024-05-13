<script setup lang="ts">
const props = defineProps({
  id: Number,
  title: String,
  price: Number,
  image: String
})

const goToProduct = () => {
  // @ts-ignore
  Ecwid.openPage('product', { id: props.id })
}

const addToCart = () => {
  const date = new Date(Date.now())
  const fieldTitle = `added_product_id_${props.id}_at_${Date.now()}`
  const title = `Product id=${props.id} was added to order from widget at ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  // @ts-ignore
  window.ec = window.ec || {}
  // @ts-ignore
  ec.order = ec.order || {}
  // @ts-ignore
  ec.order.extraFields = ec.order.extraFields || {}
  // @ts-ignore
  ec.order.extraFields[fieldTitle] = {
    title: title,
    type: 'empty'
  }
  // @ts-ignore
  Ecwid.refreshConfig && Ecwid.refreshConfig()

  // @ts-ignore
  Ecwid.Cart.addProduct(props.id)
}
</script>

<template>
  <div
    class="preview-container preview-container--active-hover-dark"
    :style="{
      'background-image': 'url(' + image + ')',
      width: '18%',
      'min-width': '180px'
    }"
  >
    <div class="live-picture" @click="goToProduct">
      <div class="live-picture__header">{{ price }}₽</div>
      <div class="live-picture__body" :style="{ 'font-size': '1rem', 'line-height': '1rem' }">
        {{ title?.replace(/^ОБРАЗЕЦ\.\s*/, '') }}
      </div>
      <div class="live-picture__footer">
        <button class="btn btn-default" @click.stop="addToCart">Add to cart</button>
      </div>
    </div>
  </div>
</template>
