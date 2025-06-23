import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-fortune-app/', // あなたのリポジトリ名に合わせてください

  plugins: [react()],

  // 依存関係の解決に関する設定
  resolve: {
    // Firebaseのインポートパスを明示的に解決するためのエイリアス
    alias: {
      'firebase/app': 'firebase/app/dist/index.esm.js',
      'firebase/auth': 'firebase/auth/dist/index.esm.js',
      'firebase/firestore': 'firebase/firestore/dist/index.esm.js',
    },
    dedupe: ['react', 'react-dom'], 
  },

  // 依存関係の最適化に関する設定（ビルドパフォーマンス向上とモジュール解決）
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
    ],
  },

  build: {
    // CommonJSモジュールの解決を改善するための設定（これは引き続き必要）
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      output: {
        // Firebase関連のモジュールを別々のチャンクに分割
        manualChunks: (id) => {
          if (id.includes('firebase')) {
            return 'vendor-firebase'; // Firebase関連のファイルを一つのチャンクにまとめる
          }
          if (id.includes('node_modules')) {
            return 'vendor'; // その他のnode_modulesを別のチャンクにまとめる
          }
        },
      },
    },
  },
});