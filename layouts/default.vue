<script setup lang="ts">
import { SupportedTLDs } from "~/utils/domain";
import { useStyleStore } from "~/stores/style";

const { t } = useI18n();

const state = reactive({
  domain: "",
});

const toast = useToast();
const router = useRouter();

const runtimeConfig = useRuntimeConfig();
const localePath = useLocalePath();

const handleAction = async (url: any) => {
  if (!state.domain) {
    showToast("请输入域名，格式为：whois.ls");
    return;
  }

  let domain = trimDomain(state.domain);
  const parts = splitDomain(domain);

  if (!validateDomain(parts)) return;
  if (!isTLDValid(parts)) return;

  domain = updateDomainForTLD(parts);
  state.domain = domain;

  await router.push(localePath(`/${url}/${state.domain.replace(/\./g, "_")}.html`));
};

const trimDomain = (domain: string): string => {
  return domain.trim().toLowerCase();
};

const splitDomain = (domain: string): string[] => {
  return domain.split(".");
};

const validateDomain = (parts: string[]): boolean => {
  if (parts.length < 2) {
    showToast("您输入的域名格式不正确!");
    return false;
  }
  return true;
};

const isTLDValid = (parts: string[]): boolean => {
  const lastPart = parts[parts.length - 1].toLowerCase();
  const potentialTLD = parts.slice(-2).join(".").toLowerCase();

  if (!SupportedTLDs.has(lastPart) && !SupportedTLDs.has(potentialTLD)) {
    showToast("您输入的域名后缀不合法!");
    return false;
  }
  return true;
};

const updateDomainForTLD = (parts: string[]): string => {
  const potentialTLD = parts.slice(-2).join(".").toLowerCase();
  let domainToKeep: string;
  if (SupportedTLDs.has(potentialTLD)) {
    domainToKeep = parts.length > 2 ? parts.slice(-3).join(".") : parts.join(".");
  } else {
    domainToKeep = parts.slice(-2).join(".");
  }
  return domainToKeep;
};

const styleStore = useStyleStore();
const clientMounted = ref(false);

onMounted(() => {
  clientMounted.value = true;
});

const showToast = (message: string) => {
  toast.add({
    title: message,
    position: "center", // 将提示信息放在屏幕中间
    duration: 3000, // 设置提示信息的显示时间（可选）
  });
};
</script>

<template>
  <div
    class="w-full text-xs bg-[#F1F3F4] dark:bg-transparent"
    :class="{ 'h-[90vh]': !styleStore.getIsPage && clientMounted }"
  >
    <div
      class="max-w-screen-lg mx-auto px-[1em] pb-[10vh]"
      :class="{ 'pt-[25vh]': !styleStore.getIsPage && clientMounted, 'pt-[5vh]': styleStore.getIsPage || !clientMounted }"
    >
      <nav class="w-full text-[#464747] h-5 dark:bg-gray-700">
        <NuxtLink
          :to="localePath('/')"
          class="mb-3 font-bold text-2xl inline-block text-current no-underline dark:text-white"
        >
          <h1 class="inline-block text-current no-underline dark:text-white">{{ runtimeConfig?.public?.Domain }}</h1>
          <sup class="text-[#59a8d7] dark:text-[#ace4f8]">{{ runtimeConfig?.public?.DomainSuffix }}</sup>
        </NuxtLink>
      </nav>

      <div class="mt-6">
        <UForm
          :state="state"
          class="flex items-center space-x-2 mb-3 dark:text-white"
          @submit="handleAction('whois')"
        >
          <div class="flex-grow">
            <UInput
              v-model="state.domain"
              :placeholder="t('index.placeholder')"
              color="sky"
              size="xl"
              class="w-full"
            />
          </div>
          <UButton type="submit" color="sky" size="xl" v-if="state.domain">
            {{ t('index.onSubmit') }}
          </UButton>
        </UForm>
      </div>
      <CommonBulletin
        v-if="!styleStore.isPage && clientMounted"
        :text="`公告:  ${t('index.tips') }`"
      />

      <TabList @action="handleAction" />
      <slot />
    </div>
  </div>
  <CommonFooter />
</template>

<style scoped>

</style>
