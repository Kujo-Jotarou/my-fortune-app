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
      // アプリ内で他のFirebaseサブモジュール（例: 'firebase/database'など）を
      // インポートしている場合は、ここに追加してください
    ],
  },

  build: {
    // commonjsOptions を削除 (optimizeDeps とは別に問題を起こす可能性も考慮)
    // rollupOptions.external は以前のエラーメッセージが再度出ているため、
    // やはりRollupにビルドさせない方針に戻します。
    rollupOptions: {
      external: [
        'firebase/app',
        'firebase/auth',
        'firebase/firestore',
        // 他にFirebaseサブモジュールを使っている場合はここに追加
      ],
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