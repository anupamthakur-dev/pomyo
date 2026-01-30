import { useEffect } from "react";
import type { MODE } from "../type";
import { useSetTimerModal } from "../hooks/useSetTimerModal";


export default function SetTimerModal({
  changeTimeOf,
}: {
  changeTimeOf: MODE;
}) {
  const {
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    onWheel,
    selectedMode,
    switchMode,
    count,
  } = useSetTimerModal(changeTimeOf);

  useEffect(() => {
    switchMode(changeTimeOf);
  }, [changeTimeOf,switchMode]);

  return (
    <div className="setTimerModal">
      <div className="progress">
        <h3>Set Your Pomodoro Time</h3>
        <p>
          Define timings for <span className="highlight">{selectedMode}</span>.
        </p>
        <div>
          <span className="value teko-400">
            {count < 10 ? `0${count}` : `${count}`} : 00
          </span>{" "}
          {count > 1 ? "Minutes" : "Minute"}
        </div>
      </div>
      <div
        className="input_container"
        onWheel={onWheel}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
      ></div>
    </div>
  );
}
