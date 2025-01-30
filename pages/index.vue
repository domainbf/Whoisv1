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
    <h1 class="text-3xl font-bold">Domain+DNS Lookup<span class="text-blue-500">whois.ls</span></h1>
    
    <!-- 搜索框 -->
    <div class="search-box my-4">
      <input type="text" :placeholder="t('index.placeholder')" class="w-full max-w-xl px-4 py-2 border rounded-lg" />
    </div>
    
    <!-- 提示文本 -->
    <div class="feedback-text text-gray-600 my-2">
      <span>如有任何建议和反馈都可以联系我们，</span>
      <a href="#" class="text-blue-500">【点击反馈】</a>
    </div>
    
    <!-- 功能图标区 -->
    <div class="feature-icons my-4">
      <!-- 这里是你的图标按钮 -->
    </div>
    
    <!-- 广告位区域 -->
    <div class="ad-space mx-auto my-4 p-4 border rounded-lg">
      <span class="text-blue-500 text-xl">whois.ls</span>
    </div>
  </div>
</template>

<style scoped>
.ad-space {
  width: 100%;
  max-width: 800px;
  min-height: 200px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
