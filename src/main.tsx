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
import PomodoroTomatoBridge from "./components/PomodoroTomatoBridge.tsx";
import PomodoroAudioEffects from "./components/PomodoroAudioEffect.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TomatoProvider>
        <ModalProvider>
          <SettingsHydrationGate />
          <PomodoroTomatoBridge />
          <PomodoroAudioEffects />
          <App />
        </ModalProvider>
      </TomatoProvider>
    </ThemeProvider>
  </StrictMode>
);
