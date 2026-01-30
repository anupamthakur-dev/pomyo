import { useEffect } from "react";
import { pluginRegistry } from "../core/timer";
import { TitleBarPlugin } from "../plugins/titleBarPlugin";

export default function SyncTimerTotitle() {

    useEffect(() => {
        const titlePlugin = new TitleBarPlugin({showWhenPaused:true,prefix:'Pomyo | '})
        pluginRegistry.register(titlePlugin);

        return () => {
            pluginRegistry.unregister('titlebar-plugin');
        }
    }, []);

    return null;
}