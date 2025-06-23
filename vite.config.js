import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-fortune-app/', // あなたのリポジトリ名に合わせてください

  plugins: [react()],

  // 開発時 (dev server) の依存関係の最適化設定
  // FirebaseモジュールをViteがプリバンドル対象に含めるように指示
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      // 他にFirebaseサブモジュールを使っている場合はここに追加
    ],
  },

  build: {
    // CommonJSモジュールの解決を改善するための設定
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      // Rollupのビルド時に、Firebaseモジュールをバンドルから除外する（外部化する）
      // これにより、Rollupがこれらのインポートを解決できなくてもビルドが失敗しないようにします
      external: [
        'firebase/app',
        'firebase/auth',
        'firebase/firestore',
        // 他にFirebaseサブモジュールを使っている場合はここに追加
      ],
      output: {
        // Firebase関連のモジュールを別々のチャンクに分割
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