import ReactDOM from 'react-dom/client';

import App from './App';

async function deferRender() {
  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
});
