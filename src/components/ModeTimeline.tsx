import { usePomyoStore } from "../core/timer";
import { decideNextSession } from "../uitls/helper";

export default function ModeTimeline() {
  const {mode, focusSessionCompleted} = usePomyoStore();
  const activeMode = mode;
  const nextMode = decideNextSession(mode,focusSessionCompleted);
  const modeLabels = {
    focus: "Focus",
    "short-break": "Short break",
    "long-break": "Long break",
  };

  return (
    <div className="mode-timeline-cont">
      <div className={`mode-timeline active`}>{modeLabels[activeMode]}</div>
      <div className={`mode-timeline `}>{modeLabels[nextMode]}</div>
    </div>
  );
}
