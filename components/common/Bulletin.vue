<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const announcements = [
  '您提交的域名查询信息不会被记录和保留！',
  '如有任何问题和反馈可以联系我们，<a href="mailto:domain@nic.bn" class="text-blue-500 hover:underline">点击反馈</a>',
  '本站域名出售，更多域名请前往<a href="http://domain.bf" target="_blank" class="text-blue-500 hover:underline">domain.bf</a>查看'
]

const currentAnnouncement = ref(announcements[0])
let timer: NodeJS.Timer | null = null

const getRandomAnnouncement = () => {
  const currentIndex = announcements.indexOf(currentAnnouncement.value)
  let newIndex
  do {
    newIndex = Math.floor(Math.random() * announcements.length)
  } while (newIndex === currentIndex && announcements.length > 1)
  
  currentAnnouncement.value = announcements[newIndex]
}

onMounted(() => {
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
      <!-- 添加动画效果的喇叭图标 -->
      <div class="mr-3 flex items-center">
        <div class="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>
      </div>
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

/* 添加喇叭图标的动画效果 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
