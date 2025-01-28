<script setup lang="ts">
import { useI18n } from 'vue-i18n' // 确保导入 useI18n

const localePath = useLocalePath()
const { t } = useI18n() // 确保 t 函数被正确解构
</script>

<template>
  <footer class="text-gray-800 h-[10vh] bg-[#F1F3F4] dark:text-white  dark:bg-[#5b77af]">
    <div class="max-w-5xl mx-auto py-4 px-4 flex justify-between items-center">
      <div class="text-sm">
        {{ t('footer.text') }} <!-- 确保 t 函数调用正确 -->
      </div>
      <div class="flex items-center space-x-4">
        <NuxtLink :to="localePath('/api.html')" class="hover:underline">{{ t('footer.api') }}</NuxtLink>
        <NuxtLink to="https://github.com/7836246/Nuxt-Whois" class="hover:underline">
          <span class="text-2xl font-bold">W</span> <!-- 字母 W 图标 -->
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
