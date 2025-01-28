<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faGlobe)

const localePath = useLocalePath()
const { t } = useI18n()
</script>

<template>
  <footer class="text-gray-800 h-[10vh] bg-[#F1F3F4] dark:text-white dark:bg-[#5b77af]">
    <div class="max-w-5xl mx-auto py-4 px-4 flex justify-between items-center">
      <div class="text-sm">
        {{ t('footer.text')}}
      </div>
      <div class="flex items-center space-x-4">
        <NuxtLink :to="localePath('/api.html')" class="hover:underline">{{ t('footer.api') }}</NuxtLink>
        <NuxtLink to="https://github.com/7836246/Nuxt-Whois" class="hover:underline">
          <FontAwesomeIcon :icon="['fas', 'globe']" class="h-6 w-6" />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
