import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/my-fortune-app/', // あなたのリポジトリ名に合わせてください
  plugins: [react()],
  build: {
    // commonjsOptions: ViteがCommonJSモジュール（多くのnpmパッケージで使用される形式）を
    // 正しく扱えるようにするための設定
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      // Firebaseモジュールを外部化しない。ViteとRollupにバンドルさせる
      // external: ['firebase/app', 'firebase/auth', 'firebase/firestore'], // ★この行は削除またはコメントアウトします★
    }
  }
})