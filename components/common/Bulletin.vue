<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const announcements = [
  '您提交的域名查询信息不会被记录和保留！',
  '如有任何问题和反馈可以联系我们，<a href="mailto:domain@nic.bn" class="text-blue-500 hover:underline">点击反馈</a>',
  '本站域名出售，更多域名请前往<a href="http://domain.bf" target="_blank" class="text-blue-500 hover:underline">domain.bf</a>查看'
]

const currentAnnouncement = ref(announcements[0])
let timer: NodeJS.Timer | null = null

// 随机获取公告
const getRandomAnnouncement = () => {
  const currentIndex = announcements.indexOf(currentAnnouncement.value)
  let newIndex
  do {
    newIndex = Math.floor(Math.random() * announcements.length)
  } while (newIndex === currentIndex && announcements.length > 1)
  
  currentAnnouncement.value = announcements[newIndex]
}

onMounted(() => {
  // 每2.5秒切换一次公告
  timer = setInterval(getRandomAnnouncement, 2500)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="bg-gray-200 p-3 rounded-md mb-5 dark:bg-[#5b77af]">
    <div class="flex items-center">
      <i aria-hidden="true" class="icon fas fa-bullhorn mr-3"></i>
      <div class="flex-grow">
        <div class="text-sm text-gray-800 dark:text-white" v-html="currentAnnouncement"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
