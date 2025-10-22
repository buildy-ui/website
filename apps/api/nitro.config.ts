import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  preset: 'vercel',
  runtimeConfig: {
    // public runtime config if needed
    public: {}
  },
  srcDir: 'src',
  serveStatic: false,
  typescript: { generateTsConfig: true },
})


