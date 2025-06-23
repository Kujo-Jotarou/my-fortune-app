import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // pathモジュールをインポート

// ViteのESM環境で__dirnameの代替として現在のファイルのディレクトリパスを取得
// import.meta.urlはES Modulesのメタ情報。file://から始まるURLをpath.dirnameでディレクトリ名に変換。
const __dirname = path.dirname(new URL(import.meta.url).pathname);


// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-fortune-app/', // あなたのリポジトリ名に合わせてください

  plugins: [react()],

  // 依存関係の解決に関する設定
  resolve: {
    alias: {
      // Firebaseの各モジュールをnode_modules内のESMビルドに直接エイリアスします。
      // これにより、Viteはインポート時に正しいファイルを見つけ、バンドルに含めます。
      // パスは実際のnode_modules内の構造に合わせています。
      'firebase/app': path.resolve(__dirname, 'node_modules/firebase/app/dist/esm/index.js'),
      'firebase/auth': path.resolve(__dirname, 'node_modules/firebase/auth/dist/esm/index.js'),
      'firebase/firestore': path.resolve(__dirname, 'node_modules/firebase/firestore/dist/esm/index.js'),
      // アプリ内で他のFirebaseサブモジュール（例: 'firebase/database'など）を
      // インポートしている場合は、ここに追加してください
    },
    // dedupe は今回のエラーの直接原因ではないため、一旦削除してシンプルにします。
  },

  // 開発時 (dev server) の依存関係の最適化設定
  // ビルドエラーの直接の原因ではないが、安定性のために維持
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      // アプリ内で他のFirebaseサブモジュールを使っている場合はここに追加
    ],
  },

  build: {
    // CommonJSモジュールの解決を改善するための設定。これも維持します。
    // transformMixedEsModules: true を追加し、混在するモジュール形式の変換を強化。
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true, 
    },
    rollupOptions: {
      // ★重要★: external は削除します。Firebaseモジュールをバンドルに含めるためです。
      external: [], // このリストを空にする
      output: {
        // Firebase関連のモジュールをvendor-firebaseチャンクにまとめる
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