import { useEffect, useRef, useState } from "react";
import { useNotifyStore } from "../store/notify.store";
import { animated, useTransition } from "@react-spring/web";

export function CountdownNotify() {
  const { countdown } = useNotifyStore();
  const [count, setCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const transition = useTransition(countdown, {
    from: {
      opacity: 0,
      transform: "translateY(-12px) scale(0.96)",
    },
    enter: {
      opacity: 1,
      transform: "translateY(0) scale(1)",
    },
    leave: {
      opacity: 0,
      transform: "translateY(-12px) scale(0.96)",
    },
    config: {
      tension: 180,
      friction: 16,
    },
  });

  useEffect(() => {
    if (!countdown) return;
    if (timerRef.current) return;
    setCount(countdown.countdown / 1000)
    timerRef.current = setInterval(() => {
      setCount((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [countdown])

  return transition((styles, item) => item && (
    <animated.div className={`notify-countdown `} role="status"
      aria-live="polite"
      key={item.id} style={styles} >
      <div className="notify-body">
        {item.title && <div className="notify-title">{item.title}</div>}
        <div className="notify-message">{item.message}</div>
      </div>
      <div className="countdown teko-700">{count}s</div>
    </animated.div>
  ))

}