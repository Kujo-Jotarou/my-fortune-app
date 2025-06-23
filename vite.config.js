import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-fortune-app/', // GitHub Pagesのサブディレクトリに合わせてください

  plugins: [react()],

  // 依存関係の解決に関する設定
  resolve: {
    // 重複する依存関係を解決するための設定（Firebaseのインポート問題に役立つことがある）
    dedupe: ['react', 'react-dom'], 
  },

  // 依存関係の最適化に関する設定（ビルドパフォーマンス向上とモジュール解決）
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      // 他にFirebaseのサブモジュールを使っている場合はここに追加
    ],
  },

  build: {
    // RollupOptions.external は通常、ビルドから完全に除外したい場合に使うため、
    // 今回のケースではCommonJSOptionsとoptimizeDepsで解決を試みます。
    // もし以前にここに追加していた場合は、削除してください。
    rollupOptions: {
      // external: ['firebase/app', 'firebase/auth', 'firebase/firestore'] // ★この行は削除またはコメントアウトします★
    },
    // CommonJSモジュールの解決を改善するための設定
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});