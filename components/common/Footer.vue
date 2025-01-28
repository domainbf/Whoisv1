<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' // You can remove this import if not used elsewhere
import { faGlobe } from '@fortawesome/free-solid-svg-icons' // You can remove this import if not used elsewhere
import { library } from '@fortawesome/fontawesome-svg-core' // You can remove this import if not used elsewhere

library.add(faGlobe) // You can remove this line if not used elsewhere

const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <footer class="text-gray-800 h-[10vh] bg-[#F1F3F4] dark:text-white dark:bg-[#5b77af]">
    <div class="max-w-5xl mx-auto py-4 px-4 flex justify-between items-center">
      <div class="text-sm">
        {{ t('footer.text') }}
      </div>
      <div class="flex items-center space-x-4">
        <NuxtLink :to="localePath('/api.html')" class="hover:underline">{{ t('footer.api') }}</NuxtLink>
        </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
