import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import './core/bootstrap.ts';
import './store/store-sync.ts';
import App from "./App.tsx";

import { TomatoProvider } from "./context/tomatoProvider.tsx";

import ModalProvider from "./context/modalProvider.tsx";
import ThemeProvider from "./context/themeProvider.tsx";

import { SettingsHydrationGate } from "./components/SettingHydrationGate.tsx";

import PomodoroAudioEffects from "./components/PomodoroAudioEffect.tsx";
import NotifyHost from "./components/NotifyHost.tsx";

const rootEl = document.getElementById("root")!;
rootEl.style.display = "block";

createRoot(rootEl).render(
  <StrictMode>
    <ThemeProvider>
      <TomatoProvider>
        <ModalProvider>
          <SettingsHydrationGate />
        
          <PomodoroAudioEffects />
          <App />
          <NotifyHost/>
        </ModalProvider>
      </TomatoProvider>
    </ThemeProvider>
  </StrictMode>
);
