import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'meokdang',
  permissions: [],
  navigationBar: {
    withBackButton: true,
    withHomeButton: true,
  },
  webView: {
    allowsBackForwardNavigationGestures: true,
  },
  webBundleDir: 'dist',
});
