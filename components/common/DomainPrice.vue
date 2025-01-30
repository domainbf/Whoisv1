<!-- /components/common/DomainPrice.vue -->
<template>
    <div class="w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <div class="grid grid-cols-4 gap-4">
            <div class="text-center">
                <div class="text-gray-600 dark:text-gray-300 text-sm">注册价格</div>
                <div class="text-lg font-semibold text-blue-600">
                    {{ priceData.register || '--' }}
                </div>
            </div>
            <div class="text-center">
                <div class="text-gray-600 dark:text-gray-300 text-sm">转移价格</div>
                <div class="text-lg font-semibold text-green-600">
                    {{ priceData.transfer || '--' }}
                </div>
            </div>
            <div class="text-center">
                <div class="text-gray-600 dark:text-gray-300 text-sm">续费价格</div>
                <div class="text-lg font-semibold text-orange-600">
                    {{ priceData.renew || '--' }}
                </div>
            </div>
            <div class="text-center">
                <div class="text-gray-600 dark:text-gray-300 text-sm">注册状态</div>
                <div class="text-lg font-semibold" :class="statusColor">
                    {{ priceData.status || '未知' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    priceData: {
        type: Object,
        default: () => ({
            register: null,
            transfer: null,
            renew: null,
            status: null
        })
    }
});

const statusColor = computed(() => {
    switch (props.priceData.status) {
        case '可注册':
            return 'text-green-600';
        case '已注册':
            return 'text-red-600';
        default:
            return 'text-gray-600';
    }
});
</script>
