    // src/index.jsx
    import React from 'react';
    import ReactDOM from 'react-dom/client'; // React 18を使用しているためcreateRootをインポート
    import './index.css'; // index.cssをインポート
    import App from './App'; // App.jsxコンポーネントをインポート

    // DOMのルート要素を取得し、Reactアプリケーションをレンダリング
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // reportWebVitalsはコメントアウトまたは削除します。
    // import reportWebVitals from './reportWebVitals';
    // reportWebVitals(console.log);
    