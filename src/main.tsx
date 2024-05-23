import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

async function deferRedner() {
  const {worker} = await import("./mocks/browser");
  return worker.start();
}

deferRedner().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})

