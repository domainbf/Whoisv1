<script setup lang="ts">
import {ParseWhois} from "~/utils/whoisToJson";
import {AdjustTimeToUTCOffset} from "~/utils/utc";
import {useTimeStore} from "~/stores/time";
import {useStyleStore} from "~/stores/style";
import DomainPrice from '~/components/common/DomainPrice.vue';

const route = useRoute();
const {domain} = route.params;

const {t} = useI18n()

const domainData = domain.replace(/_/g, '.')

const showRawData = ref(false);
const timeStore = useTimeStore()
const styleStore = useStyleStore()
const settingsStore = useSettingsStore()

const localePath = useLocalePath()

const {data, pending, error, refresh} = await useAsyncData(
    'whois',
    () => $fetch('/api/whois', {
        method: 'POST',
        body: JSON.stringify({domain: domainData})
    })
)

const {data: priceData} = await useAsyncData(
    'domainPrice',
    () => $fetch('/api/domain-price', {
        method: 'POST',
        body: JSON.stringify({domain: domainData})
    })
);

if (!error.value && settingsStore.getHistory) {
    styleStore.addOrUpdateHistory(
        {
            id: domainData,
            type: 'whois',
            domain: domainData,
            path: localePath(`/whois/${domain}.html`),
            date: AdjustTimeToUTCOffset(new Date().toString(), timeStore.timeZones)
        }
    )
}

// Parse the whois information
const parsedInfo = computed(() => {
    if (data.value && typeof data.value === 'object') {
        return data.value;
    }
    return ParseWhois(data.value);
});

// Automatically show raw data if no information is retrieved
if (!parsedInfo.value.domainName && !parsedInfo.value.registrar) {
    showRawData.value = true;
}

styleStore.setIsPage(true)
useHead({
    title: `${domainData} - ${t('whois.title')}`,
    meta: [
        {
            name: 'description',
            content: t('whois.description', {domain: domainData})
        }, {
            name: 'keywords',
            content: t('whois.keywords', {domain: domainData})
        }
    ]
})
</script>

<template>
    <div>
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-200">
                {{ t('whois.title') }}：{{ domainData }}
            </h1>
            <div class="flex gap-4">
                <UButton
                    :loading="pending"
                    :icon="pending ? undefined : 'i-heroicons-arrow-path'"
                    @click="refresh"
                >
                    {{ t('button.refresh') }}
                </UButton>
            </div>
        </div>

        <DomainPrice
            v-if="priceData && !error"
            :price-data="priceData"
            class="mt-4 mb-4"
        />

        <table v-if="!showRawData && !error"
               class="w-full bg-[#fffffe] p-4 shadow-lg rounded-lg mt-5 dark:bg-gray-800 dark:text-gray-200">
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-if="parsedInfo.domainName"
                    class="hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-700 text-gray-200">
                    <th class="p-4 text-left font-semibold text-gray-900 dark:text-gray-200">
                        {{ t('result.domain') }}
                    </th>
                    <td class="p-4 text-gray-900 dark:text-gray-200">
                        <p>
                            <NuxtLink :to="`//${parsedInfo.domainName}`" target="_blank" rel="nofollow"
                                     class="text-blue-600 hover:text-blue-800">
                                {{ parsedInfo.domainName }}
                            </NuxtLink>
                        </p>
                    </td>
                </tr>
                <!-- 其他表格行保持不变 -->
            </tbody>
        </table>

        <CommonBulletin v-if="error" class="mt-5">
            <template #text>
                <Icon name="bx:error" size="16px" color="red"/>
                {{ t('error.notFound') }}
            </template>
        </CommonBulletin>

        <div v-if="showRawData"
             class="w-full bg-[#fffffe] mt-5 p-4 shadow-lg rounded-lg whitespace-pre-wrap dark:text-gray-200 dark:bg-gray-800">
            {{ data }}
        </div>
    </div>
</template>

<style scoped>
</style>
