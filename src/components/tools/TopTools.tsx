import GhostBtn from "../buttons/ghostBtn";

import ThemeIconBtn from "../buttons/themeIconBtn";
import { Icon } from "../icon";
import { useTheme } from "../../context/themeProvider";
import { useTodoPanel } from "../../store/UI/todoPanel.store";
import IconBtn from "../buttons/IconButton";

import ModeTimeline from "../ModeTimeline";
import { usePomyoStore } from "../../core/timer";

export default function TopTools({ timerModal }: { timerModal: boolean }) {
  const { toggleFlowMode, flowMode } = usePomyoStore();

  const { theme, toggleTheme } = useTheme();
  const toggleTodoPanel = useTodoPanel((state) => state.toggle);

  return (
    <div
      className={`top-tool-container ${
        timerModal ? "exit-up hidden" : "enter-down"
      }`}
    >
      <ModeTimeline />
      <div className="logo">
        <img src="./pomyoLogo.svg" alt="Pomyo Logo" />
      </div>

      <div style={{ width: "fit-content" }} className="topToggleContainer">
        <ThemeIconBtn
          text="Flow mode"
          action={toggleFlowMode}
          color="var(--level-high)"
          isActive={flowMode}
          icon="Zap"
        />
        <IconBtn text="Todos" action={toggleTodoPanel} icon="ListTodo" />
        <GhostBtn text="theme" action={toggleTheme}>
          <Icon name={theme === "light" ? "Moon" : "Sun"} />
        </GhostBtn>
      </div>
    </div>
  );
}
