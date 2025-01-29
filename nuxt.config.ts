// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/devtools',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'nuxt-headlessui',
    '@pinia/nuxt', // needed
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-simple-robots',
  ],
  features: {
    inlineStyles: true,
  },
  runtimeConfig: {
    public: {
      Domain: 'Domain+DNS Lookup',
      DomainSuffix: 'whois.ls',
    }
  },
  app: {
    head: {
      title: 'Whois.ls',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'whois.ls' },
        { hid: 'og:title', property: 'og:title', content: 'Whois.ls' },
        { hid: 'og:description', property: 'og:description', content: 'whois.ls - Domain and DNS Lookup' },
        { hid: 'og:image', property: 'og:image', content: '/whoisls.png' },
        { hid: 'og:url', property: 'og:url', content: 'https://whois.ls' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Whois.ls' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'whois.ls - Domain and DNS Lookup' },
        { hid: 'twitter:image', name: 'twitter:image', content: '/whois.ls.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
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
    prefix: 'Headless'
  },
});
