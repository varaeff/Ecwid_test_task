<script setup lang="ts">
const props = defineProps({
  title: String,
  text: String,
  btnText: String,
  btnFunction: Function
})

const handleClick = () => {
  if (props.btnFunction) {
    props.btnFunction()
  }
}
</script>

<template>
  <div class="a-card a-card--compact a-card--error">
    <div class="a-card__paddings">
      <div class="iconable-block iconable-block--hide-in-mobile iconable-block--error">
        <div class="iconable-block__infographics">
          <span class="iconable-block__icon"
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" focusable="false">
              <path
                d="M34.5 67C16.58 67 2 52.42 2 34.5S16.58 2 34.5 2 67 16.58 67 34.5 52.42 67 34.5 67zm0-62C18.23 5 5 18.23 5 34.5S18.23 64 34.5 64 64 50.77 64 34.5 50.77 5 34.5 5z"
              ></path>
              <path
                d="M34.5 49c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM35.5 38.57h-2l-1-14c0-1.17.89-2.07 2-2.07s2 .9 2 2l-1 14.07z"
              ></path>
            </svg>
          </span>
        </div>
        <div class="iconable-block__content">
          <div class="cta-block">
            <div class="cta-block__central">
              <div class="cta-block__title">{{ title }}</div>
              <div class="cta-block__content">{{ text }}</div>
            </div>
            <div class="cta-block__cta">
              <button type="button" class="btn btn-primary btn-medium" @click="handleClick">
                {{ btnText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
