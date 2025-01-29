// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/devtools',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'nuxt-headlessui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-simple-robots',
  ],
  features: {
    inlineStyles: true, // 谨慎使用，建议根据实际情况决定是否开启
  },
  runtimeConfig: {
    public: {
      siteName: 'Whois.ls',
      siteDescription: 'Domain and DNS Lookup',
      siteUrl: 'https://whois.ls', // 确保包含完整的URL
      ogImage: '/images/whoisls.png', // 图片放在 public/images 目录下
    },
  },
  app: {
    head: {
      title: 'Whois.ls',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: () => useRuntimeConfig().public.siteDescription },
        { hid: 'og:title', property: 'og:title', content: () => useRuntimeConfig().public.siteName },
        { hid: 'og:description', property: 'og:description', content: () => useRuntimeConfig().public.siteDescription },
        {
          hid: 'og:image',
          property: 'og:image',
          content: () => useRuntimeConfig().public.siteUrl + useRuntimeConfig().public.ogImage,
        },
        { hid: 'og:url', property: 'og:url', content: () => useRuntimeConfig().public.siteUrl },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: () => useRuntimeConfig().public.siteName },
        { hid: 'twitter:description', name: 'twitter:description', content: () => useRuntimeConfig().public.siteDescription },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: () => useRuntimeConfig().public.siteUrl + useRuntimeConfig().public.ogImage,
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'zh',
    detectBrowserLanguage: {
      useCookie: true,
    },
    locales: [
      { code: 'zh', iso: 'zh-Hans', file: 'zh.ts' },
      { code: 'en', iso: 'en-US', file: 'en.ts' },
      { code: 'tw', iso: 'zh-Hant', file: 'tw.ts' },
    ],
    langDir: 'lang/',
  },
  headlessui: {
    prefix: 'Headless',
  },
});
