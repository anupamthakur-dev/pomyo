import "../styles/notify.css";
import { useNotifyStore } from "../store/notify.store";
import { Icon } from "./icon";
import { animated, useTransition } from "@react-spring/web";

import { CountdownNotify } from "./CountdownNotify";

export default function NotifyHost() {
  const { current, dismiss } = useNotifyStore();

  // if (!current) return null;


const transition = useTransition(current, {
  exitBeforeEnter: true,
  trail:0,
  from: {
    opacity: 0,
    transform: "translateY(-8px) scale(0.98)",
  },
  enter: {
    opacity: 1,
    transform: "translateY(0) scale(1)",
  },
  leave: {
    opacity: 0,
    transform: "translateY(-8px) scale(0.98)",
  },
  config: {
    tension: 600,
    friction: 28,
  },
});


  return (<div className="notify-host">
    <CountdownNotify/>
    {transition(
    (styles, item) =>
      item && (

        <animated.div
          className={`notify notify--${item.type}`}
          role="status"
          aria-live="polite"
          key={item.id}
          style={styles}
        >
          <div className="notify-body">
            {item.title && <div className="notify-title">{item.title}</div>}
            <div className="notify-message">{item.message}</div>
          </div>

          <button
            className="notify-close"
            onClick={dismiss}
            aria-label="Dismiss notify"
          >
            <Icon name="X" />
          </button>
        </animated.div>

      ),
  )} </div>);
}
