<script setup lang="ts">
import {useStyleStore} from "~/stores/style";

const styleStore = useStyleStore()
styleStore.setIsPage(false)

const {t} = useI18n()
useHead({
  title: `${t('index.title')} - ${t('app.title')}`,
  meta: [
    {
      name: 'description',
      content: t('index.description')
    },{
      name: 'keywords',
      content: t('index.keywords')
    }
  ]
})
</script>

<template>
  <div class="text-center mt-4">
    <div class="ad-space mx-auto my-4">
      <span class="text-5xl">𝕎𝕙𝕠𝕚𝕤.𝕃𝕤</span>
    </div>
  </div>
</template>

<style scoped>
.ad-space {
  width: 100%;
  max-width: 800px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
