<script setup lang="ts">
import { storeSettings } from '@/app/stores/storeSettings'

const props = defineProps({
  id: Number,
  title: String,
  price: Number,
  image: String,
  inExport: Boolean
})

const store = storeSettings()
let checked = props.inExport

const handleCheckboxChange = () => {
  checked = !checked
  if (props.id) store.updateExportProductIds(props.id, checked)
}
</script>

<template>
  <div class="a-card a-card--vertical-compact">
    <div class="a-card__paddings">
      <div class="iconable-block iconable-block--hide-in-mobile">
        <div class="iconable-block__infographics">
          <span
            class="iconable-block__icon"
            :style="{ 'background-image': `url(${$props.image})` }"
          />
        </div>
        <div class="iconable-block__content">
          <div class="status-block">
            <div class="status-block__central">
              <div class="status-block__header">
                <span class="status-block__title">{{ title }}</span>
                <span class="status-block__edit">Edit</span>
              </div>
              <div class="status-block__content">
                <p>Добавить товар в CSV выгрузку</p>
              </div>
            </div>
            <div class="status-block__primary-action">
              <label class="checkbox big">
                <input name="" type="checkbox" :checked="checked" @change="handleCheckboxChange" />
                <div>
                  <div></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
