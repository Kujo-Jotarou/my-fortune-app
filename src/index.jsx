// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18を使用しているためcreateRootをインポート
import './index.css'; // もしあれば、index.cssをインポート
import App from './App'; // App.jsxコンポーネントをインポート
// import reportWebVitals from './reportWebVitals'; // 必要に応じてWeb Vitalsをレポート - 削除

// DOMのルート要素を取得し、Reactアプリケーションをレンダリング
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// パフォーマンス測定が必要な場合に使用 (オプション)
// reportWebVitals(console.log); // 削除
