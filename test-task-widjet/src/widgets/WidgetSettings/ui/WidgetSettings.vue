<script setup lang="ts">
import { storeSettings } from '@/app/stores/storeSettings'
import { AddToExport } from '@/shared/ui'
import sendProducts from '../api/sendProducts'
import { AlertComponent } from '@/shared/ui'
import type { EcwidProduct } from '@/shared/model'
import { ref } from 'vue'

const store = storeSettings()
const products: EcwidProduct[] = store.products
const exportProductIds: number[] = store.exportProductIds
let isShow: boolean = store.showWidget

const saveSettings = () => {
  localStorage.setItem('exportProductIds', JSON.stringify(store.exportProductIds))
  localStorage.setItem('cardsCount', JSON.stringify(cartsCount.value))
  localStorage.setItem('showWidget', JSON.stringify(isShow))
  store.setShowWidget(isShow)
  store.setShowSettings(false)
}

const exportError = ref(false)

async function exportData() {
  const productsToExport = products
    .filter((obj) => exportProductIds.includes(obj.id))
    .map((obj) => Object.assign({}, obj))

  exportError.value = await sendProducts(productsToExport)
}

const resetExportError = () => {
  exportError.value = false
}

const showWidget = () => {
  isShow = !isShow
}

const savedCount: number =
  JSON.parse(localStorage.getItem('cardsCount') as string) || products.length
const cartsCount = ref(savedCount)

const updateCartsCount = (event: any) => {
  cartsCount.value = event.target.value
}
</script>

<template>
  <div
    class="settings-page cf"
    :style="{
      position: 'absolute',
      'box-sizing': 'border-box',
      left: 0,
      top: 0,
      width: '100%',
      'min-height': '100vh',
      'z-index': 100
    }"
  >
    <div class="settings-page__header">
      <div class="settings-page__titles settings-page__titles--left">
        <h1 class="settings-page__title">Раздел настройки</h1>
        <div class="settings-page__subtitle">
          В этом разделе можно настроить количество карточек недавно обновленных товаров, выводимых
          в виджете, скрыть виджет, а также выгрузить данные по выбранным товарам в формате CSV
        </div>
      </div>
    </div>
    <div class="settings-page__body" style="padding-bottom: 0.1px">
      <div class="named-area">
        <div class="named-area__header">
          <div class="named-area__titles">
            <div class="named-area__title">Блок выгрузки в формат CSV"</div>
            <div class="named-area__subtitle">
              Отметьте необходимые товары, затем нажмите кнопку "Произвести выгрузку.
            </div>
          </div>
        </div>
        <div class="named-area__body">
          <AddToExport
            v-for="product in products"
            :key="product.id"
            :id="product.id"
            :title="product.name.replace(/^ОБРАЗЕЦ\.\s*/, '')"
            :image="product.smallThumbnailUrl"
            :inExport="exportProductIds.includes(product.id)"
          />
        </div>
      </div>
      <button
        v-if="!exportError"
        type="button"
        class="btn btn-default btn-large"
        :style="{
          marginBottom: '3rem'
        }"
        @click="exportData"
      >
        Произвести выгрузку
      </button>
      <AlertComponent
        v-else
        :title="'Ошибка выгрузки данных'"
        :text="'Повторите попытку позже'"
        :btn-text="'OK'"
        :btn-function="resetExportError"
      />

      <div class="named-area">
        <div class="named-area__header">
          <div class="named-area__titles">
            <div class="named-area__title">Блок настройки внешнего вида</div>
            <div class="named-area__subtitle">
              Здесь вы можете указать максимальное количество карточек товаров, выводимое в виджете,
              а также скрыть виджет.
            </div>
          </div>
          <div class="named-area__description"></div>
          <div class="named-area__additional"></div>
        </div>
        <div class="named-area__body">
          <div class="a-card a-card--normal">
            <div class="a-card__paddings">
              <div class="iconable-block__content">
                <div class="status-block">
                  <div class="status-block__central">
                    <div class="status-block__header">
                      <span class="status-block__title">Показывать виджет</span>
                    </div>
                  </div>
                  <div class="status-block__primary-action">
                    <label class="checkbox big">
                      <input name="" type="checkbox" :checked="isShow" @change="showWidget" />
                      <div>
                        <div></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="a-card a-card--normal">
            <div class="a-card__paddings">
              <div class="iconable-block__content">
                <div class="status-block">
                  <div class="status-block__central">
                    <div class="status-block__header">
                      <span class="status-block__title">Количество карточек в виджете</span>
                    </div>
                  </div>
                  <div class="status-block__primary-action">
                    <div
                      class="fieldset fieldset--with-suffix fieldset--no-label fieldset--no-closemark"
                    >
                      <div>
                        <div class="fieldset">
                          <div class="dropdown-menu fieldset">
                            <div class="dropdown-menu__link">
                              <a class="iconable-link" role="link" tabindex="-1">
                                <h3 class="iconable-link__text">{{ cartsCount }}</h3>
                                ‍<span class="iconable-link__icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 18 28"
                                    focusable="false"
                                  >
                                    <path
                                      d="M3.3 9.5l5.6 5.1 6-5.1c.8-.7 1.9-.7 2.6 0 .8.7.8 1.8 0 2.5l-7.2 6.4c-.5.4-1 .6-1.4.6s-1-.2-1.3-.5L.7 12.1c-.8-.7-.8-1.8 0-2.5.6-.8 1.9-.8 2.6-.1z"
                                    ></path>
                                  </svg>
                                </span>
                              </a>
                            </div>
                            <select
                              class="dropdown-menu__list text-default"
                              @change="updateCartsCount($event)"
                            >
                              <option v-for="index in products.length" :key="index" :value="index">
                                {{ index }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="btn btn-success btn-large"
        :style="{
          marginBottom: '3rem'
        }"
        @click="saveSettings"
      >
        Сохранить настройки
      </button>
    </div>
  </div>
</template>
