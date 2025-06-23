import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import path from 'path'; // ★この行を削除します★

// __dirname の定義も削除します。path を使わないため。
// const __dirname = path.dirname(new URL(import.meta.url).pathname);


// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-fortune-app/', // あなたのリポジトリ名に合わせてください

  plugins: [react()],

  // 依存関係の解決に関する設定
  resolve: {
    // alias を完全に削除します。Viteのデフォルトのモジュール解決に任せます。
    // 'firebase/app': path.resolve(__dirname, 'node_modules/firebase/app/dist/esm/index.js'),
    // 'firebase/auth': path.resolve(__dirname, 'node_modules/firebase/auth/dist/esm/index.js'),
    // 'firebase/firestore': path.resolve(__dirname, 'node_modules/firebase/firestore/dist/esm/index.js'),
    // dedupe も削除してシンプルに保ちます。
  },

  // 開発時 (dev server) の依存関係の最適化設定
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
    ],
  },

  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true, 
    },
    rollupOptions: {
      // external も削除します。ViteとRollupがバンドルしようと試みるようにします。
      external: [], // このリストを空にする
      output: {
        manualChunks: (id) => {
          if (id.includes('firebase')) {
            return 'vendor-firebase'; 
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});