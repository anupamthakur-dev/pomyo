import '../styles/notify.css'
import { useNotifyStore } from "../store/notify.store";
import { Icon } from "./icon";

export default function NotifyHost() {
  const { current, dismiss } = useNotifyStore();

  if (!current) return null;

  return (
    <div className="notify-host">
      <div
        className={`notify notify--${current.type}`}
        role="status"
        aria-live="polite"
        key={current.id}
      >
        <div className="notify-body">
          {current.title && (
            <div className="notify-title">
              {current.title}
            </div>
          )}
          <div className="notify-message">
            {current.message}
          </div>
        </div>

        <button
          className="notify-close"
          onClick={dismiss}
          aria-label="Dismiss notify"
        >
          <Icon name="X" />
        </button>
      </div>
    </div>
  );
}
