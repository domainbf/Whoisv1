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
    inlineStyles: true,
  },
  runtimeConfig: {
    public: {
      Domain: 'Domain+DNS Lookup',
      DomainSuffix: '0.1.0',
      siteName: 'Whois.ls Domain+DNS Lookup', // 站点名称
      siteDescription: 'whois.ls - Domain and DNS Lookup', // 站点描述
      siteUrl: 'https://whois.ls', // 站点 URL，必须包含域名
      siteLogo: '/images/whoisls.png', // 站点 Logo 图片路径，建议放在 public/images 目录下
      ogImage: '/images/whois.ls.png', // 分享图片路径，建议放在 public/images 目录下
      // 新增：略缩图配置
      thumbnail: '/images/whois.ls.png', // 略缩图路径，建议放在 public/images 目录下
    },
  },
  app: {
    head: {
      title: 'Whois.ls',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: () => useRuntimeConfig().public.siteDescription,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: () => useRuntimeConfig().public.siteName,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: () => useRuntimeConfig().public.siteDescription,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: () => useRuntimeConfig().public.siteUrl + useRuntimeConfig().public.ogImage, // 完整的 og:image URL
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: () => useRuntimeConfig().public.siteUrl,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: () => useRuntimeConfig().public.siteName, // 添加 og:site_name
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website', // 添加 og:type
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: () => useRuntimeConfig().public.siteName,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: () => useRuntimeConfig().public.siteDescription,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: () => useRuntimeConfig().public.siteUrl + useRuntimeConfig().public.ogImage, // 完整的 twitter:image URL
        },
        // 新增：微信分享所需的 meta 标签
        {
          hid: 'wx:image',
          property: 'wx:image',
          content: () => useRuntimeConfig().public.siteUrl + useRuntimeConfig().public.thumbnail, // 微信分享图片 URL
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: () => useRuntimeConfig().public.siteUrl + useRuntimeConfig().public.siteLogo, // 添加 apple-touch-icon
        },
      ],
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
