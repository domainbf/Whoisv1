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

// 添加域名价格查询
const { data: priceData } = await useAsyncData(
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
const parsedInfo = ParseWhois(data.value);

// Automatically show raw data if no information is retrieved or no result is returned
if (!parsedInfo.domainName && !parsedInfo.registrar && !parsedInfo.updatedDate && !parsedInfo.creationDate && !parsedInfo.registryExpiryDate && !parsedInfo.registrarIANAID && !parsedInfo.domainStatus && !parsedInfo.nameServers && !parsedInfo.dnssec) {
  showRawData.value = true;
}

styleStore.setIsPage(true)
useHead({
  title: `${domainData} - ${t('whois.title')}`,
  meta: [
    {
      name: 'description',
      content: t('whois.description', { domain: domainData })
    },{
      name: 'keywords',
      content: t('whois.keywords', { domain: domainData })
    }
  ]
})
</script>

<template>
  <!-- 添加域名价格显示组件 -->
  <DomainPrice 
    v-if="priceData" 
    :price-data="priceData" 
    class="mt-4 mb-4"
  />

  <table
      class="w-full bg-[#fffffe] p-4 shadow-lg rounded-lg mt-5 dark:bg-gray-800 dark:text-gray-200 text-white hover:bg-none">
    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
    <!-- 原有的表格内容 -->
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
    <!-- ... 其余原有的表格行内容保持不变 ... -->
    </tbody>
  </table>

  <!-- 公告部分 -->
  <CommonBulletin v-if="error" class="mt-5"  >
    <template #text>
      <Icon name="bx:error" size="16px" color="red" />
      {{ t('error.notFound') }}
    </template>
  </CommonBulletin>

  <div
      class="w-full  bg-[#fffffe] mt-5 p-4 shadow-lg rounded-lg whitespace-pre-wrap dark:text-gray-200 dark:bg-gray-800"
      v-if="showRawData">
    {{ data }}
  </div>
</template>

<style scoped>
</style>
