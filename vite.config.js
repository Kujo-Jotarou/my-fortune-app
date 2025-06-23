import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-fortune-app/', // あなたのリポジトリ名に合わせてください

  plugins: [react()],

  // 依存関係の解決に関する設定
  // resolve.alias は削除しました。Viteのデフォルト解決に任せます。
  // resolve.dedupe は今回の問題の直接の原因ではないため、一旦削除してシンプルにします。

  // 依存関係の最適化に関する設定（ビルドパフォーマンス向上とモジュール解決）
  optimizeDeps: {
    include: [
      // FirebaseモジュールをViteがプリバンドル対象に含めるように指示
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      // アプリ内で他のFirebaseサブモジュール（例: 'firebase/database'など）を
      // インポートしている場合は、ここに追加してください
    ],
  },

  build: {
    // CommonJSモジュールの解決を改善するための設定
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      output: {
        // Firebase関連のモジュールを一つのチャンクにまとめることで、バンドルの安定性を高める
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